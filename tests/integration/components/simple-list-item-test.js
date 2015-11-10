import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-list-item', 'Integration | Component | simple list item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#simple-list-item}}
       Item
    {{/simple-list-item}}
  `);

  assert.equal(this.$().text().trim(), 'Item');
});

test('it renders with tag', function(assert) {
  assert.expect(1);

  this.set('tag', 'li');
  this.render(hbs`
    {{#simple-list-item tagName=tag}}
       Item
    {{/simple-list-item}}
  `);

  assert.equal(this.$('li').length, 1);
});

test('it renders with css class', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#simple-list-item class='awesome-li'}}
       Item
    {{/simple-list-item}}
  `);

  assert.equal(this.$('.awesome-li').length, 1);
});

test('it call passed closure action on click and send item data by default', function(assert) {
  assert.expect(2);

  const itemData = 'itemDataString';
  this.set('itemData', itemData);
  this.set('onSelectItem', (item) => {
    assert.ok(true, 'action got called');
    assert.equal(item, itemData);
  });

  this.render(hbs`
    {{#simple-list-item item=itemData on-select=(action onSelectItem) }}
       Item
    {{/simple-list-item}}
  `);

  this.$().children().click();
});

test('it call passed action on click and send item data by default', function(assert) {
  assert.expect(2);

  this.on('onSelectItem', (item) => {
    assert.ok(true, 'action got called');
    assert.equal(item, 'itemDataString');
  });

  this.render(hbs`
    {{#simple-list-item item='itemDataString' on-select='onSelectItem' }}
       Item
    {{/simple-list-item}}
  `);

  this.$().children().click();
});
 

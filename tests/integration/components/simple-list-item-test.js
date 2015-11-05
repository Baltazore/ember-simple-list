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

test('it call passed action on click', function(assert) {
  assert.expect(1);

  this.set('clickAction', () => assert.ok(true, 'action got called'));
  this.render(hbs`
    {{#simple-list-item selectItem=clickAction}}
       Item
    {{/simple-list-item}}
  `);

  // Click on component itself
  this.$().children().click();
});

test('it call passed action on click and send item data', function(assert) {
  assert.expect(1);

  this.set('itemData', 'item data string');
  this.set('clickAction', (_component, item) => {
    assert.equal(item, this.get('itemData'));
  });

  this.render(hbs`
    {{#simple-list-item selectItem=clickAction item=itemData}}
       Item
    {{/simple-list-item}}
  `);

  // Click on component itself
  this.$().children().click();
});

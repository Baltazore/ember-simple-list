import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-list', 'Integration | Component | simple list', {
  integration: true
});

test('it renders with tags', function(assert) {
  assert.expect(4);

  this.set('tag', 'ul');
  this.set('itemTag', 'li');

  this.render(hbs`
    {{#simple-list tagName=tag}}
       {{#simple-list-item tagName=itemTag}}
           Item 1
       {{/simple-list-item}}
       {{#simple-list-item tagName=itemTag}}
           Item 2
       {{/simple-list-item}}
    {{/simple-list}}
  `);

  assert.equal(this.$('ul').length, 1);
  assert.equal(this.$('li').length, 2);

  assert.equal(this.$('li:first').text().trim(), 'Item 1');
  assert.equal(this.$('li:last').text().trim(), 'Item 2');
});

test('it set default active class to selected item', function(assert) {
  assert.expect(5);

  this.set('tag', 'ul');
  this.set('itemTag', 'li');

  this.render(hbs`
    {{#simple-list tagName=tag as |list|}}

       {{#simple-list-item tagName=itemTag list=list}}
           Item 1
       {{/simple-list-item}}
       {{#simple-list-item tagName=itemTag list=list}}
           Item 2
       {{/simple-list-item}}

    {{/simple-list}}
  `);

  assert.equal(this.$('.active').length, 1);

  this.$('li:first').click();
  assert.equal(this.$('.active').length, 1);
  assert.equal(this.$('.active').text().trim(), 'Item 1');

  this.$('li:last').click();
  assert.equal(this.$('.active').length, 1);
  assert.equal(this.$('.active').text().trim(), 'Item 2');
});

test('it set passed selected class to selected item', function(assert) {
  assert.expect(5);

  this.set('selectedClass', 'simple-selected');
  this.set('tag', 'ul');
  this.set('itemTag', 'li');

  this.render(hbs`
    {{#simple-list tagName=tag selectedClass=selectedClass as |list|}}

       {{#simple-list-item tagName=itemTag list=list}}
           Item 1
       {{/simple-list-item}}

       {{#simple-list-item tagName=itemTag list=list}}
           Item 2
       {{/simple-list-item}}

    {{/simple-list}}
  `);

  assert.equal(this.$('.simple-selected').length, 1);

  this.$('li:first').click();
  assert.equal(this.$('.simple-selected').length, 1);
  assert.equal(this.$('.simple-selected').text().trim(), 'Item 1');

  this.$('li:last').click();
  assert.equal(this.$('.simple-selected').length, 1);
  assert.equal(this.$('.simple-selected').text().trim(), 'Item 2');
});

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

// test('it set passed selected class to selected item', function(assert) {
//   assert.expect(2);

//   this.set('selected', 'simple-selected');
//   this.set('tag', 'ul');
//   this.set('itemTag', 'li');

//   this.render(hbs`
//     {{#simple-list tagName=tag selectedClass=selected as |itemSelected|}}
//        {{#simple-list-item tagName=itemTag itemSelected=itemSelected}}
//            Item 1
//        {{/simple-list-item}}
//        {{#simple-list-item tagName=itemTag itemSelected=itemSelected}}
//            Item 2
//        {{/simple-list-item}}
//     {{/simple-list}}
//   `);

//   this.$('li:first').click();
//   assert.equal(this.$('.simple-selected').text().trim(), 'Item 1');

//   this.$('li:first').click();
//   assert.equal(this.$('.simple-selected').text().trim(), 'Item 2');
// });

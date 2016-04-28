import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

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

test('it sends passed on-select actions within context', function(assert) {
  assert.expect(2);

  this.set('onItem1', () => assert.ok(true, 'First Item selected'));
  this.on('onItem2', () => assert.ok(true, 'Second Item selected'));

  this.render(hbs`
    {{#simple-list tagName='ul' as |list|}}

       {{#simple-list-item tagName='li' list=list on-select=(action onItem1)}}
           Item 1
       {{/simple-list-item}}

       {{#simple-list-item tagName='li' list=list on-select="onItem2"}}
           Item 2
       {{/simple-list-item}}

    {{/simple-list}}
  `);

  this.$('li:first').click();
  this.$('li:last').click();
});


test('it sets selected object when item selected', function(assert) {
  assert.expect(2);

  this.set('s', Ember.Object.create({}));

  this.render(hbs`
    {{#simple-list tagName='ul' selected=s as |list|}}

       {{#simple-list-item tagName='li' list=list item='first' }}
           Item 1
       {{/simple-list-item}}

       {{#simple-list-item tagName='li' list=list item='second'}}
           Item 2
       {{/simple-list-item}}

    {{/simple-list}}
  `);

  this.$('li:first').click();
  assert.equal(this.get('s.item'), 'first');
  this.$('li:last').click();
  assert.equal(this.get('s.item'), 'second');
});

test('it sets active tab by initSelectedItemNum', function(assert) {
  assert.expect(2);

  this.set('initNum', 1);
  this.render(hbs`
    {{#simple-list initSelectedItemNum=initNum as |list|}}

       {{#simple-list-item list=list}}
           Item 1
       {{/simple-list-item}}

       {{#simple-list-item list=list}}
           Item 2
       {{/simple-list-item}}

    {{/simple-list}}
  `);

  assert.equal(this.$('.active').text().trim(), 'Item 2');
  this.set('initNum', 0);
  assert.equal(this.$('.active').text().trim(), 'Item 1');
});

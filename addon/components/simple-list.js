import Ember from 'ember';
import layout from '../templates/components/simple-list';

const { Component, Object: emObj, A: emArr } = Ember;

export default Component.extend({
  layout,

  initSelectedItemNum: 0, // injected
  selectedClass: null, // injected
  selected: emObj.create({ item: null }),

  init() {
    this._super(...arguments);
    this.set('items', emArr([]));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('items').clear();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    
    let itemIndex = this.get('initSelectedItemNum');
    let newSelectedItem = this.get('items')[itemIndex];
    if (newSelectedItem) {
      this.activateItem(newSelectedItem);
    }
  },

  activateItem(item) {
    item.activate();
    this.get('items').without(item).forEach((item) => item.deactivate());
    this.set('selected.item', item.get('item'));
  },

  actions: {
    registerItem(item) {
      if(this.get('items').length === this.get('initSelectedItemNum')) {
        this.activateItem(item);
      }
      this.get('items').pushObject(item);
    },

    selectItem(item) {
      // Remove active class form other items
      this.get('items').without(item).forEach(item => item.deactivate());

      // Set active class to selected item
      this.activateItem(item);
    }
  }

});

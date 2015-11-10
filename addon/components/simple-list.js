import Ember from 'ember';
import layout from '../templates/components/simple-list';

const {
  Component,
  Object,
  A,
  on
} = Ember;

export default Component.extend({
  layout: layout,
  items: A([]),
  selected: Object.create({item: null}),

  _clear: on('willDestroyElement', function() {
    this.get('items').clear();
  }),

  activateItem(item) {
    item.activate();
    this.set('selected.item', item.get('itemData'));
  },

  actions: {
    registerItem(item) {
      if(this.get('items').length === 0) {
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

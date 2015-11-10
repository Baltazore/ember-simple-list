import Ember from 'ember';
import layout from '../templates/components/simple-list';

export default Ember.Component.extend({
  layout: layout,
  items: Ember.A([]),

  willDestroyElement() {
    this.get('items').clear();
  },

  actions: {
    registerItem(item) {
      if(this.get('items').length === 0) {
        item.activate();
      }
      this.get('items').pushObject(item);
    },

    itemSelected(item) {
      // Remove active class form other items
      this.get('items').without(item).forEach(item => item.deactivate());

      // Set active class to selected item
      item.activate();
    }
  }

});

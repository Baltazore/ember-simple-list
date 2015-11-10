import Ember from 'ember';
import layout from '../templates/components/simple-list';

export default Ember.Component.extend({
  layout: layout,
  items: Ember.A([]),
  selected: Ember.Object.create({item: null}),

  willDestroyElement() {
    this.get('items').clear();
  },

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

    itemSelected(item) {
      // Remove active class form other items
      this.get('items').without(item).forEach(item => item.deactivate());

      // Set active class to selected item
      this.activateItem(item);
    }
  }

});

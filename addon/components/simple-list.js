import Ember from 'ember';
import layout from '../templates/components/simple-list';

export default Ember.Component.extend({
  layout: layout,

  didReceiveAttrs() {
    this.set('selectedItem', null);
  },

  currentItem: Ember.computed('selectedItem', function() {
    return this.get('selectedItem');
  }),

  actions: {

    itemSelected(item, itemData) {
      this.set('selectedItem', item);

      return this.attrs.selectedClass;
    }

  }
});

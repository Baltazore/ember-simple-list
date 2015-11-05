import Ember from 'ember';
import layout from '../templates/components/simple-list';

export default Ember.Component.extend({
  layout: layout,

  actions: {
    itemSelected(item, itemData) {
      // TODO: set class to active item and reload classes for ohters
    }
  }
});

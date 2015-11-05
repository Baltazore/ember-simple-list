import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs () {
    if (this.attrs.item) {
      this.set('itemData', this.attrs.item.value);
    }
  },

  click() {
    this.attrs.itemSelected(this, this.get('itemData'));
  }
});

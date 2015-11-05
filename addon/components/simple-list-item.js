import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['active'],

  didReceiveAttrs () {
    this.set('active', false);

    if (this.attrs.item) {
      this.set('itemData', this.attrs.item.value);
    }

    if (this.attrs.selected) {
      this.set('active', this.attrs.selected.value === this);
    } else {
      this.attrs.itemSelected(this, this.get('itemData'));
    }
  },

  click() {
    this.attrs.itemSelected(this, this.get('itemData'));
  }
});

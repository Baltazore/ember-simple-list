import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  didReceiveAttrs () {
    if (this.attrs.item) {
      this.set('itemData', this.attrs.item.value);
    }

    if (this.attrs.selected) {
      if(this.attrs.selected.value === this) {
        this.set('isActive', this.get('selectedClass'));
      } else {
        this.set('isActive', false);
      }
    } else {
      this.selectItem();
    }
  },

  selectItem() {
    if (this.attrs.itemSelected) {
      let selectedClass = this.attrs.itemSelected(this, this.get('itemData'));

      if(selectedClass && selectedClass.value) {
        this.set('selectedClass', selectedClass.value);
      }
    }
  },

  click() {
    this.selectItem();
  }
});

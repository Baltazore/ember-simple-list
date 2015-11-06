import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  selectItem() {
    if (this.attrs['on-select']) {
      let selectedClass = this.attrs['on-select'](this, this.get('itemData'));

      if(selectedClass && selectedClass.value) {
        this.set('selectedClass', selectedClass.value);
      }
    }
  },

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

  click() {
    this.selectItem();
  }
});

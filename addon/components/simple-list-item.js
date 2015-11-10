import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  didReceiveAttrs () {
    if (this.attrs.item && this.attrs.item.value) {
      this.set('itemData', this.attrs.item.value);
    }

    if (this.attrs.selected && this.attrs.selected.value) {
      this.setActiveClass();
    } else {
      this.selectItem();
      // Force to set active class on first item
      this.set('isActive', this.get('selectedClass'));
    }
  },

  setActiveClass() {
    if(this.attrs.selected.value === this) {
      this.set('isActive', this.get('selectedClass'));
    } else {
      this.set('isActive', false);
    }
  },

  selectItem() {
    if (this.attrs.itemSelected) {
      let selectedClass = this.attrs.itemSelected(this);

      if(selectedClass && selectedClass.value) {
        this.set('selectedClass', selectedClass.value);
      }

      this.set('isActive', this.get('selectedClass'));
    }
  },

  onSelectAction() {
    if (this.attrs['on-select']) {
      this.attrs['on-select'](this.get('itemData'));
    }
  },

  click() {
    this.selectItem();

    this.onSelectAction();
  }
});

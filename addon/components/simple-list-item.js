import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  list: null, // injected
  item: null, // injected

  didReceiveAttrs() {
    let selectedClass = this.get('list.selectedClass');
    if (selectedClass) {
      this.set('selectedClass', selectedClass);
    }

    let list = this.get('list');
    if(list) {
      list.send('registerItem', this);
    }
  },

  activate() {
    if(!this.get('isActive')) {
      this.set('isActive', this.get('selectedClass'));
    }
  },

  deactivate() {
    if(this.get('isActive')) {
      this.set('isActive', false);
    }
  },

  selectItem() {
    if (this.get('list')) {
      this.get('list').send('selectItem', this);
    }
  },

  onSelectAction() {
    let onSelect = this.get('on-select');

    if (onSelect) {
      if (typeof onSelect === 'string') {
        this.sendAction('on-select', this.get('item'));
      } else {
        onSelect(this.get('item'));
      }
    }
  },

  click() {
    this.selectItem();
    this.onSelectAction();
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  list: Ember.computed({
    get() {
      if (this.attrs.list && this.attrs.list.value) {
        return this.attrs.list.value;
      } else {
        return null;
      }
    }
  }),

  didReceiveAttrs () {
    if (this.attrs.item && this.attrs.item.value) {
      this.set('itemData', this.attrs.item.value);
    }

    if(this.get('list')) {
      if(this.get('list').selectedClass) {
        this.set('selectedClass', this.get('list').selectedClass);
      }

      this.get('list').send('registerItem', this);
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
      this.get('list').send("itemSelected", this);
    }
  },

  onSelectAction() {
    let onSelect = this.attrs['on-select'];

    if (onSelect) {
      if (typeof onSelect === 'string') {
        this.sendAction('on-select', this.get('itemData'));
      } else {
        onSelect(this.get('itemData'));
      }
    }
  },

  click() {
    this.selectItem();

    this.onSelectAction();
  }
});

import Ember from 'ember';

const {
  Component,
  computed,
  on
} = Ember;

export default Component.extend({
  classNameBindings: ['isActive'],
  isActive: false,
  selectedClass: 'active',

  list: computed({
    get() {
      if (this.attrs.list && this.attrs.list.value) {
        return this.attrs.list.value;
      } else {
        return null;
      }
    }
  }),

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
    let onSelect = this.attrs['on-select'];

    if (onSelect) {
      if (typeof onSelect === 'string') {
        this.sendAction('on-select', this.get('itemData'));
      } else {
        onSelect(this.get('itemData'));
      }
    }
  },

  _receivedAttrs: on('didReceiveAttrs', function() {
    if (this.attrs.item) {
      if (typeof this.attrs.item === 'string') {
        this.set('itemData', this.attrs.item);
      } else {
        this.set('itemData', this.attrs.item.value);
      }
    }

    if(this.get('list')) {
      if(this.get('list').selectedClass) {
        this.set('selectedClass', this.get('list').selectedClass);
      }

      this.get('list').send('registerItem', this);
    }
  }),

  _select: on('click', function() {
    this.selectItem();
    this.onSelectAction();
  })
});

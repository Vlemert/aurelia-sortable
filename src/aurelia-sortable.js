import {inject, bindable} from 'aurelia-framework';
import sortable from 'sortable';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class SortableCustomAttribute {
  self = this;

  @bindable dataset = null;
  @bindable configuration = null;

  mySortable = null;

  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;

    this.eventAggregator.subscribe("itemTransfer", (item) => {
      if (this.awaitingAdd) {
        this.dataset.splice(this.addIndex, 0, item);
        this.awaitingAdd = false;
      }
    });
  }

  configurationChanged(newValue){
    this.createSortable();
  }

  attached() {
    this.createSortable();
  }

  detached() {
    this.destroySortable();
  }

  createSortable() {
    this.configuration.onAdd = (evt) => {
      evt.item.parentElement.removeChild(evt.item);
      this.awaitingAdd = true;
      this.addIndex = evt.newIndex;
    };
    this.configuration.onRemove = (evt) => {
      this.eventAggregator.publish("itemTransfer", this.dataset[evt.oldIndex]);

      if (this.configuration.group.pull == true) {
        this.dataset.splice(evt.oldIndex, 1);
      }
    };
    this.configuration.onUpdate = (evt) => {
      if (evt.newIndex < evt.oldIndex) {
        evt.item.parentElement.removeChild(evt.item);
      }

      this.moveInArray(this.dataset, evt.oldIndex, evt.newIndex);
    };

    this.mySortable = new sortable(this.element, this.configuration);
  }

  destroySortable() {
    if (this.mySortable != null) {
      this.mySortable.destroy();
    }
  }

  moveInArray(target, oldIndex, newIndex) {
    let item = target.splice(oldIndex, 1)[0];
    target.splice(newIndex, 0, item);
    return target; // for testing purposes
  }
}
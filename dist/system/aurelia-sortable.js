System.register(['aurelia-framework', 'sortable', 'aurelia-event-aggregator'], function (_export) {
  'use strict';

  var inject, bindable, sortable, EventAggregator, SortableCustomAttribute;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_sortable) {
      sortable = _sortable['default'];
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      SortableCustomAttribute = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(SortableCustomAttribute, [{
          key: 'dataset',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'configuration',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function SortableCustomAttribute(element, eventAggregator) {
          var _this = this;

          _classCallCheck(this, _SortableCustomAttribute);

          this.self = this;

          _defineDecoratedPropertyDescriptor(this, 'dataset', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'configuration', _instanceInitializers);

          this.mySortable = null;

          this.element = element;
          this.eventAggregator = eventAggregator;

          this.eventAggregator.subscribe("itemTransfer", function (item) {
            if (_this.awaitingAdd) {
              _this.dataset.splice(_this.addIndex, 0, item);
              _this.awaitingAdd = false;
            }
          });
        }

        _createDecoratedClass(SortableCustomAttribute, [{
          key: 'configurationChanged',
          value: function configurationChanged(newValue) {
            this.createSortable();
          }
        }, {
          key: 'attached',
          value: function attached() {
            this.createSortable();
          }
        }, {
          key: 'detached',
          value: function detached() {
            this.destroySortable();
          }
        }, {
          key: 'createSortable',
          value: function createSortable() {
            var _this2 = this;

            this.configuration.onAdd = function (evt) {
              evt.item.parentElement.removeChild(evt.item);
              _this2.awaitingAdd = true;
              _this2.addIndex = evt.newIndex;
            };
            this.configuration.onRemove = function (evt) {
              _this2.eventAggregator.publish("itemTransfer", _this2.dataset[evt.oldIndex]);

              if (_this2.configuration.group.pull == true) {
                _this2.dataset.splice(evt.oldIndex, 1);
              }
            };
            this.configuration.onUpdate = function (evt) {
              if (evt.newIndex < evt.oldIndex) {
                evt.item.parentElement.removeChild(evt.item);
              }

              _this2.moveInArray(_this2.dataset, evt.oldIndex, evt.newIndex);
            };

            this.mySortable = new sortable(this.element, this.configuration);
          }
        }, {
          key: 'destroySortable',
          value: function destroySortable() {
            if (this.mySortable != null) {
              this.mySortable.destroy();
            }
          }
        }, {
          key: 'moveInArray',
          value: function moveInArray(target, oldIndex, newIndex) {
            var item = target.splice(oldIndex, 1)[0];
            target.splice(newIndex, 0, item);
            return target;
          }
        }], null, _instanceInitializers);

        var _SortableCustomAttribute = SortableCustomAttribute;
        SortableCustomAttribute = inject(Element, EventAggregator)(SortableCustomAttribute) || SortableCustomAttribute;
        return SortableCustomAttribute;
      })();

      _export('SortableCustomAttribute', SortableCustomAttribute);
    }
  };
});
'use strict';var helpers=require('./helpers-1afc4b71.js'),vue=require('vue'),index=require('./index-1621a98b.js'),Calendar_vue_vue_type_style_index_0_id_0e88c5b9_lang=require('./Calendar.vue_vue&type=style&index=0&id=0e88c5b9&lang-6ae4b39f.js'),Popover_vue_vue_type_style_index_0_id_5059a25e_lang=require('./Popover.vue_vue&type=style&index=0&id=5059a25e&lang-1a220d5a.js'),CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang=require('./CalendarDay.vue_vue&type=style&index=0&id=07b52efe&lang-7fc31eb8.js'),TimePicker=require('./TimePicker.js');var _dateConfig = {
  type: 'auto',
  mask: 'iso',
  // String mask when `type === 'string'`
  timeAdjust: '' // 'HH:MM:SS', 'now'

};
var _rangeConfig = {
  start: helpers.n({}, _dateConfig),
  end: helpers.n({}, _dateConfig)
};
var MODE = {
  DATE: 'date',
  DATE_TIME: 'datetime',
  TIME: 'time'
};
var RANGE_PRIORITY = {
  NONE: 0,
  START: 1,
  END: 2,
  BOTH: 3
};
var script = {
  name: 'DatePicker',
  emits: ['update:modelValue', 'drag', 'dayclick', 'daykeydown', 'popover-will-show', 'popover-did-show', 'popover-will-hide', 'popover-did-hide'],
  render: function render() {
    var _this = this;

    // Footer
    var _footer = function footer(wrap, wrapperEl) {
      if (!_this.$slots.footer) return wrap;
      var children = [wrap, _this.$slots.footer()];
      return wrapperEl ? vue.h(wrapperEl, children) : children;
    }; // Timepicker renderer


    var timePicker = function timePicker() {
      if (!_this.dateParts) return null;
      var parts = _this.isRange ? _this.dateParts : [_this.dateParts[0]];
      return vue.h('div', {}, helpers.n(helpers.n({}, _this.$slots), {}, {
        default: function _default() {
          return parts.map(function (dp, idx) {
            return vue.h(TimePicker['default'], {
              modelValue: dp,
              locale: _this.$locale,
              theme: _this.$theme,
              is24hr: _this.is24hr,
              minuteIncrement: _this.minuteIncrement,
              showBorder: !_this.isTime,
              isDisabled: _this.isDateTime && !dp.isValid || _this.isDragging,
              'onUpdate:modelValue': function onUpdateModelValue(p) {
                return _this.onTimeInput(p, idx === 0);
              }
            });
          });
        }
      }));
    }; // Calendar renderer


    var calendar = function calendar() {
      return vue.h(Calendar_vue_vue_type_style_index_0_id_0e88c5b9_lang.s, helpers.n(helpers.n({}, _this.$attrs), {}, {
        attributes: _this.attributes_,
        theme: _this.$theme,
        locale: _this.$locale,
        minDate: _this.minDateExact || _this.minDate,
        maxDate: _this.maxDateExact || _this.maxDate,
        disabledDates: _this.disabledDates,
        availableDates: _this.availableDates,
        onDayclick: _this.onDayClick,
        onDaykeydown: _this.onDayKeydown,
        onDaymouseenter: _this.onDayMouseEnter,
        ref: 'calendar'
      }), helpers.n(helpers.n({}, _this.$slots), {}, {
        footer: function footer() {
          return _this.isDateTime ? _footer(timePicker()) : _footer();
        }
      }));
    }; // Content renderer


    var content = function content() {
      if (_this.isTime) {
        return vue.h('div', {
          class: ['vc-container', "vc-".concat(_this.$theme.color), {
            'vc-is-dark': _this.$theme.isDark
          }]
        }, _footer(timePicker(), 'div'));
      }

      return calendar();
    };

    return this.$slots.default ? vue.h('div', [// Slot content
    this.$slots.default(this.slotArgs), // Popover content
    vue.h(Popover_vue_vue_type_style_index_0_id_5059a25e_lang.s, {
      id: this.datePickerPopoverId,
      placement: 'bottom-start',
      contentClass: "vc-container".concat(this.isDark ? ' vc-is-dark' : ''),
      onBeforeShow: function onBeforeShow(e) {
        return _this.$emit('popover-will-show', e);
      },
      onAfterShow: function onAfterShow(e) {
        return _this.$emit('popover-did-show', e);
      },
      onBeforeHide: function onBeforeHide(e) {
        return _this.$emit('popover-will-hide', e);
      },
      onAfterHide: function onAfterHide(e) {
        return _this.$emit('popover-did-hide', e);
      },
      ref: 'popover'
    }, {
      default: content
    })]) : content();
  },
  mixins: [index.e],
  props: {
    mode: {
      type: String,
      default: MODE.DATE
    },
    modelValue: {
      type: null,
      required: true
    },
    modelConfig: {
      type: Object,
      default: function _default() {
        return helpers.n({}, _dateConfig);
      }
    },
    is24hr: Boolean,
    minuteIncrement: Number,
    isRequired: Boolean,
    isRange: Boolean,
    updateOnInput: {
      type: Boolean,
      default: index.g('datePicker.updateOnInput')
    },
    inputDebounce: {
      type: Number,
      default: index.g('datePicker.inputDebounce')
    },
    popover: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    dragAttribute: Object,
    selectAttribute: Object,
    attributes: Array
  },
  data: function data() {
    return {
      value_: null,
      dateParts: null,
      activeDate: '',
      dragValue: null,
      inputValues: ['', ''],
      updateTimeout: null,
      watchValue: true,
      datePickerPopoverId: helpers.q()
    };
  },
  computed: {
    isDate: function isDate() {
      return this.mode.toLowerCase() === MODE.DATE;
    },
    isDateTime: function isDateTime() {
      return this.mode.toLowerCase() === MODE.DATE_TIME;
    },
    isTime: function isTime() {
      return this.mode.toLowerCase() === MODE.TIME;
    },
    isDragging: function isDragging() {
      return !!this.dragValue;
    },
    modelConfig_: function modelConfig_() {
      if (this.isRange) {
        return {
          start: helpers.n(helpers.n({}, _rangeConfig.start), this.modelConfig.start || this.modelConfig),
          end: helpers.n(helpers.n({}, _rangeConfig.end), this.modelConfig.end || this.modelConfig)
        };
      }

      return helpers.n(helpers.n({}, _dateConfig), this.modelConfig);
    },
    inputMask: function inputMask() {
      var masks = this.$locale.masks;

      if (this.isTime) {
        return this.is24hr ? masks.inputTime24hr : masks.inputTime;
      }

      if (this.isDateTime) {
        return this.is24hr ? masks.inputDateTime24hr : masks.inputDateTime;
      }

      return this.$locale.masks.input;
    },
    inputMaskHasTime: function inputMaskHasTime() {
      return /[Hh]/g.test(this.inputMask);
    },
    inputMaskHasDate: function inputMaskHasDate() {
      return /[dD]{1,2}|Do|W{1,4}|M{1,4}|YY(?:YY)?/g.test(this.inputMask);
    },
    inputMaskPatch: function inputMaskPatch() {
      if (this.inputMaskHasTime && this.inputMaskHasDate) {
        return index.P.DATE_TIME;
      }

      if (this.inputMaskHasDate) return index.P.DATE;
      if (this.inputMaskHasTime) return index.P.TIME;
      return undefined;
    },
    slotArgs: function slotArgs() {
      var _this2 = this;

      var isRange = this.isRange,
          isDragging = this.isDragging,
          updateValue = this.updateValue,
          showPopover = this.showPopover,
          hidePopover = this.hidePopover,
          togglePopover = this.togglePopover;
      var inputValue = isRange ? {
        start: this.inputValues[0],
        end: this.inputValues[1]
      } : this.inputValues[0];
      var events = [true, false].map(function (isStart) {
        return helpers.n({
          input: _this2.onInputInput(isStart),
          change: _this2.onInputChange(isStart),
          keyup: _this2.onInputKeyup
        }, CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang.g(helpers.n(helpers.n({}, _this2.popover_), {}, {
          id: _this2.datePickerPopoverId,
          callback: function callback(e) {
            if (e.action === 'show' && e.completed) {
              _this2.onInputShow(isStart);
            }
          }
        })));
      });
      var inputEvents = isRange ? {
        start: events[0],
        end: events[1]
      } : events[0];
      return {
        inputValue: inputValue,
        inputEvents: inputEvents,
        isDragging: isDragging,
        updateValue: updateValue,
        showPopover: showPopover,
        hidePopover: hidePopover,
        togglePopover: togglePopover,
        getPopoverTriggerEvents: CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang.g
      };
    },
    popover_: function popover_() {
      return helpers.e(this.popover, index.g('datePicker.popover'));
    },
    selectAttribute_: function selectAttribute_() {
      if (!this.hasValue(this.value_)) return null;

      var attribute = helpers.n(helpers.n({
        key: 'select-drag'
      }, this.selectAttribute), {}, {
        dates: this.value_,
        pinPage: true
      });

      var dot = attribute.dot,
          bar = attribute.bar,
          highlight = attribute.highlight,
          content = attribute.content;

      if (!dot && !bar && !highlight && !content) {
        attribute.highlight = true;
      }

      return attribute;
    },
    dragAttribute_: function dragAttribute_() {
      if (!this.isRange || !this.hasValue(this.dragValue)) {
        return null;
      }

      var attribute = helpers.n(helpers.n({
        key: 'select-drag'
      }, this.dragAttribute), {}, {
        dates: this.dragValue
      });

      var dot = attribute.dot,
          bar = attribute.bar,
          highlight = attribute.highlight,
          content = attribute.content;

      if (!dot && !bar && !highlight && !content) {
        attribute.highlight = {
          startEnd: {
            fillMode: 'outline'
          }
        };
      }

      return attribute;
    },
    attributes_: function attributes_() {
      var attrs = helpers.d(this.attributes) ? helpers.F(this.attributes) : [];

      if (this.dragAttribute_) {
        attrs.push(this.dragAttribute_);
      } else if (this.selectAttribute_) {
        attrs.push(this.selectAttribute_);
      }

      return attrs;
    }
  },
  watch: {
    inputMask: function inputMask() {
      this.formatInput();
    },
    modelValue: function modelValue(val) {
      if (!this.watchValue) return;
      this.forceUpdateValue(val, {
        config: this.modelConfig,
        notify: false,
        formatInput: true,
        hidePopover: false
      });
    },
    value_: function value_() {
      this.refreshDateParts();
    },
    dragValue: function dragValue() {
      this.refreshDateParts();
    },
    timezone: function timezone() {
      this.refreshDateParts();
      this.forceUpdateValue(this.value_, {
        notify: true,
        formatInput: true
      });
    }
  },
  created: function created() {
    this.forceUpdateValue(this.modelValue, {
      config: this.modelConfig_,
      notify: false,
      formatInput: true,
      hidePopover: false
    });
    this.refreshDateParts();
  },
  mounted: function mounted() {
    // Handle escape key presses
    helpers.o(document, 'keydown', this.onDocumentKeyDown); // Clear drag on background click

    helpers.o(document, 'click', this.onDocumentClick);
  },
  beforeUnmount: function beforeUnmount() {
    // Clean up handlers
    helpers.p(document, 'keydown', this.onDocumentKeyDown);
    helpers.p(document, 'click', this.onDocumentClick);
  },
  methods: {
    getDateParts: function getDateParts(date) {
      return this.$locale.getDateParts(date);
    },
    getDateFromParts: function getDateFromParts(parts) {
      return this.$locale.getDateFromParts(parts);
    },
    refreshDateParts: function refreshDateParts() {
      var _this3 = this;

      var value = this.dragValue || this.value_;
      var dateParts = [];

      if (this.isRange) {
        if (value && value.start) {
          dateParts.push(this.getDateParts(value.start));
        } else {
          dateParts.push({});
        }

        if (value && value.end) {
          dateParts.push(this.getDateParts(value.end));
        } else {
          dateParts.push({});
        }
      } else if (value) {
        dateParts.push(this.getDateParts(value));
      } else {
        dateParts.push({});
      }

      this.$nextTick(function () {
        return _this3.dateParts = dateParts;
      });
    },
    onDocumentKeyDown: function onDocumentKeyDown(e) {
      // Clear drag on escape keydown
      if (this.dragValue && e.key === 'Escape') {
        this.dragValue = null;
      }
    },
    onDocumentClick: function onDocumentClick(e) {
      if (document.body.contains(e.target) && !helpers.G(this.$el, e.target)) {
        this.dragValue = null;
        this.formatInput();
      }
    },
    onDayClick: function onDayClick(day) {
      this.handleDayClick(day); // Re-emit event

      this.$emit('dayclick', day);
    },
    onDayKeydown: function onDayKeydown(day) {
      switch (day.event.key) {
        case ' ':
        case 'Enter':
          {
            this.handleDayClick(day);
            day.event.preventDefault();
            break;
          }

        case 'Escape':
          {
            this.hidePopover();
          }
      } // Re-emit event


      this.$emit('daykeydown', day);
    },
    handleDayClick: function handleDayClick(day) {
      var _this$popover_ = this.popover_,
          keepVisibleOnInput = _this$popover_.keepVisibleOnInput,
          visibility = _this$popover_.visibility;
      var opts = {
        patch: index.P.DATE,
        adjustTime: true,
        formatInput: true,
        hidePopover: this.isDate && !keepVisibleOnInput && visibility !== 'visible'
      };

      if (this.isRange) {
        if (!this.isDragging) {
          this.dragTrackingValue = helpers.n({}, day.range);
        } else {
          this.dragTrackingValue.end = day.date;
        }

        opts.isDragging = !this.isDragging;
        opts.rangePriority = opts.isDragging ? RANGE_PRIORITY.NONE : RANGE_PRIORITY.BOTH;
        opts.hidePopover = opts.hidePopover && !opts.isDragging;
        this.updateValue(this.dragTrackingValue, opts);
      } else {
        opts.clearIfEqual = !this.isRequired;
        this.updateValue(day.date, opts);
      }
    },
    onDayMouseEnter: function onDayMouseEnter(day) {
      if (!this.isDragging) return;
      this.dragTrackingValue.end = day.date;
      this.updateValue(this.dragTrackingValue, {
        patch: index.P.DATE,
        adjustTime: true,
        formatInput: true,
        hidePriority: false,
        rangePriority: RANGE_PRIORITY.NONE
      });
    },
    onTimeInput: function onTimeInput(parts, isStart) {
      var _this4 = this;

      var value = null;

      if (this.isRange) {
        var start = isStart ? parts : this.dateParts[0];
        var end = isStart ? this.dateParts[1] : parts;
        value = {
          start: start,
          end: end
        };
      } else {
        value = parts;
      }

      this.updateValue(value, {
        patch: index.P.TIME,
        rangePriority: isStart ? RANGE_PRIORITY.START : RANGE_PRIORITY.END
      }).then(function () {
        return _this4.adjustPageRange(isStart);
      });
    },
    onInputInput: function onInputInput(isStart) {
      var _this5 = this;

      return function (e) {
        if (!_this5.updateOnInput) return;

        _this5.onInputUpdate(e.target.value, isStart, {
          formatInput: false,
          hidePopover: false,
          debounce: _this5.inputDebounce
        });
      };
    },
    onInputChange: function onInputChange(isStart) {
      var _this6 = this;

      return function (e) {
        _this6.onInputUpdate(e.target.value, isStart, {
          formatInput: true,
          hidePopover: false
        });
      };
    },
    onInputUpdate: function onInputUpdate(inputValue, isStart, opts) {
      var _this7 = this;

      this.inputValues.splice(isStart ? 0 : 1, 1, inputValue);
      var value = this.isRange ? {
        start: this.inputValues[0],
        end: this.inputValues[1] || this.inputValues[0]
      } : inputValue;
      var config = {
        type: 'string',
        mask: this.inputMask
      };
      this.updateValue(value, helpers.n(helpers.n({}, opts), {}, {
        config: config,
        patch: this.inputMaskPatch,
        rangePriority: isStart ? RANGE_PRIORITY.START : RANGE_PRIORITY.END
      })).then(function () {
        return _this7.adjustPageRange(isStart);
      });
    },
    onInputShow: function onInputShow(isStart) {
      this.adjustPageRange(isStart);
    },
    onInputKeyup: function onInputKeyup(e) {
      // Escape key only
      if (e.key !== 'Escape') return;
      this.updateValue(this.value_, {
        formatInput: true,
        hidePopover: true
      });
    },
    updateValue: function updateValue(value) {
      var _this8 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      clearTimeout(this.updateTimeout);
      return new Promise(function (resolve) {
        var debounce = opts.debounce,
            args = helpers.H(opts, ["debounce"]);

        if (debounce > 0) {
          _this8.updateTimeout = setTimeout(function () {
            _this8.forceUpdateValue(value, args);

            resolve(_this8.value_);
          }, debounce);
        } else {
          _this8.forceUpdateValue(value, args);

          resolve(_this8.value_);
        }
      });
    },
    forceUpdateValue: function forceUpdateValue(value) {
      var _this9 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$config = _ref.config,
          config = _ref$config === void 0 ? this.modelConfig_ : _ref$config,
          _ref$patch = _ref.patch,
          patch = _ref$patch === void 0 ? index.P.DATE_TIME : _ref$patch,
          _ref$notify = _ref.notify,
          notify = _ref$notify === void 0 ? true : _ref$notify,
          _ref$clearIfEqual = _ref.clearIfEqual,
          clearIfEqual = _ref$clearIfEqual === void 0 ? false : _ref$clearIfEqual,
          _ref$formatInput = _ref.formatInput,
          formatInput = _ref$formatInput === void 0 ? true : _ref$formatInput,
          _ref$hidePopover = _ref.hidePopover,
          hidePopover = _ref$hidePopover === void 0 ? false : _ref$hidePopover,
          _ref$adjustTime = _ref.adjustTime,
          adjustTime = _ref$adjustTime === void 0 ? false : _ref$adjustTime,
          _ref$isDragging = _ref.isDragging,
          isDragging = _ref$isDragging === void 0 ? this.isDragging : _ref$isDragging,
          _ref$rangePriority = _ref.rangePriority,
          rangePriority = _ref$rangePriority === void 0 ? RANGE_PRIORITY.BOTH : _ref$rangePriority;

      // 1. Normalization
      var normalizedValue = this.normalizeValue(value, config, patch, rangePriority); // Reset to previous value if it was cleared but is required

      if (!normalizedValue && this.isRequired) {
        normalizedValue = this.value_;
      } // Time Adjustment


      if (adjustTime) {
        normalizedValue = this.adjustTimeForValue(normalizedValue, config);
      } // 2. Validation (date or range)


      var isDisabled = this.valueIsDisabled(normalizedValue);

      if (isDisabled) {
        if (isDragging) return;
        normalizedValue = this.value_; // Don't allow hiding popover

        hidePopover = false;
      } // 3. Assignment


      var valueKey = isDragging ? 'dragValue' : 'value_';
      var valueChanged = !this.valuesAreEqual(this[valueKey], normalizedValue); // Clear value if same value selected and clearIfEqual is set

      if (!isDisabled && !valueChanged && clearIfEqual) {
        normalizedValue = null;
        valueChanged = true;
      } // Assign value


      if (valueChanged) {
        this[valueKey] = normalizedValue; // Clear drag value if needed

        if (!isDragging) this.dragValue = null;
      } // 4. Denormalization/Notification


      if (notify && valueChanged) {
        // 4A. Denormalization
        var denormalizedValue = this.denormalizeValue(normalizedValue, this.dateConfig); // 4B. Notification

        var event = this.isDragging ? 'drag' : 'update:modelValue';
        this.watchValue = false;
        this.$emit(event, denormalizedValue);
        this.$nextTick(function () {
          return _this9.watchValue = true;
        });
      } // 5. Hide popover if needed


      if (hidePopover) this.hidePopover(); // 6. Format inputs if needed

      if (formatInput) this.formatInput();
    },
    hasValue: function hasValue(value) {
      if (this.isRange) {
        return helpers.y(value) && value.start && value.end;
      }

      return !!value;
    },
    normalizeValue: function normalizeValue(value, config, patch, rangePriority) {
      if (!this.hasValue(value)) return null;

      if (this.isRange) {
        var result = {};
        var start = value.start > value.end ? value.end : value.start;
        var startFillDate = this.value_ && this.value_.start || this.modelConfig_.start.fillDate;
        var startConfig = config.start || config;
        result.start = this.normalizeDate(start, helpers.n(helpers.n({}, startConfig), {}, {
          fillDate: startFillDate,
          patch: patch
        }));
        var end = value.start > value.end ? value.start : value.end;
        var endFillDate = this.value_ && this.value_.end || this.modelConfig_.end.fillDate;
        var endConfig = config.end || config;
        result.end = this.normalizeDate(end, helpers.n(helpers.n({}, endConfig), {}, {
          fillDate: endFillDate,
          patch: patch
        }));
        return this.sortRange(result, rangePriority);
      }

      return this.normalizeDate(value, helpers.n(helpers.n({}, config), {}, {
        fillDate: this.value_ || this.modelConfig_.fillDate,
        patch: patch
      }));
    },
    adjustTimeForValue: function adjustTimeForValue(value, config) {
      if (!this.hasValue(value)) return null;

      if (this.isRange) {
        return {
          start: this.$locale.adjustTimeForDate(value.start, config.start || config),
          end: this.$locale.adjustTimeForDate(value.end, config.end || config)
        };
      }

      return this.$locale.adjustTimeForDate(value, config);
    },
    sortRange: function sortRange(range) {
      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RANGE_PRIORITY.NONE;
      var start = range.start,
          end = range.end;

      if (start > end) {
        switch (priority) {
          case RANGE_PRIORITY.START:
            return {
              start: start,
              end: start
            };

          case RANGE_PRIORITY.END:
            return {
              start: end,
              end: end
            };

          case RANGE_PRIORITY.BOTH:
            return {
              start: end,
              end: start
            };
        }
      }

      return {
        start: start,
        end: end
      };
    },
    denormalizeValue: function denormalizeValue(value) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.modelConfig_;

      if (this.isRange) {
        if (!this.hasValue(value)) return null;
        return {
          start: this.$locale.denormalizeDate(value.start, config.start || config),
          end: this.$locale.denormalizeDate(value.end, config.end || config)
        };
      }

      return this.$locale.denormalizeDate(value, config);
    },
    valuesAreEqual: function valuesAreEqual(a, b) {
      if (this.isRange) {
        var aHasValue = this.hasValue(a);
        var bHasValue = this.hasValue(b);
        if (!aHasValue && !bHasValue) return true;
        if (aHasValue !== bHasValue) return false;
        return helpers.I(a.start, b.start) && helpers.I(a.end, b.end);
      }

      return helpers.I(a, b);
    },
    valueIsDisabled: function valueIsDisabled(value) {
      return this.hasValue(value) && this.disabledAttribute && this.disabledAttribute.intersectsDate(value);
    },
    formatInput: function formatInput() {
      var _this10 = this;

      this.$nextTick(function () {
        var opts = {
          type: 'string',
          mask: _this10.inputMask
        };

        var value = _this10.denormalizeValue(_this10.dragValue || _this10.value_, opts);

        if (_this10.isRange) {
          _this10.inputValues = [value && value.start, value && value.end];
        } else {
          _this10.inputValues = [value, ''];
        }
      });
    },
    showPopover: function showPopover() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang.s(helpers.n(helpers.n(helpers.n({
        ref: this.$el
      }, this.popover_), opts), {}, {
        isInteractive: true,
        id: this.datePickerPopoverId
      }));
    },
    hidePopover: function hidePopover() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang.h(helpers.n(helpers.n(helpers.n({
        hideDelay: 10
      }, this.showPopover_), opts), {}, {
        id: this.datePickerPopoverId
      }));
    },
    togglePopover: function togglePopover(opts) {
      CalendarDay_vue_vue_type_style_index_0_id_07b52efe_lang.t(helpers.n(helpers.n(helpers.n({
        ref: this.$el
      }, this.popover_), opts), {}, {
        isInteractive: true,
        id: this.datePickerPopoverId
      }));
    },
    adjustPageRange: function adjustPageRange(isStart) {
      var _this11 = this;

      this.$nextTick(function () {
        var calendar = _this11.$refs.calendar;

        var page = _this11.getPageForValue(isStart);

        var position = isStart ? 1 : -1;

        if (page && calendar && !helpers.w(page, calendar.firstPage, calendar.lastPage)) {
          calendar.move(page, {
            position: position,
            transition: 'fade'
          });
        }
      });
    },
    getPageForValue: function getPageForValue(isStart) {
      if (this.hasValue(this.value_)) {
        return this.pageForDate(this.isRange ? this.value_[isStart ? 'start' : 'end'] : this.value_);
      }

      return null;
    },
    move: function move(args, opts) {
      if (this.$refs.calendar) {
        return this.$refs.calendar.move(args, opts);
      }

      return Promise.reject(new Error('Navigation disabled while calendar is not yet displayed'));
    },
    focusDate: function focusDate(date, opts) {
      if (this.$refs.calendar) {
        return this.$refs.calendar.focusDate(date, opts);
      }

      return Promise.reject(new Error('Navigation disabled while calendar is not yet displayed'));
    }
  }
};exports.s=script;
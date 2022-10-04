"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
global
SelectionBar
WebsyDropdown
include
enigma
schema
app
*/

/* global SelectionBar WebsyDropdown */
var SelectionBar = /*#__PURE__*/function () {
  function SelectionBar(elementId, options) {
    var _this = this;

    _classCallCheck(this, SelectionBar);

    this.elementId = elementId;
    var DEFAULTS = {
      def: {
        qInfo: {
          qType: 'currentSelections'
        },
        qSelectionObjectDef: {}
      }
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      var html = "\n      <div class=\"left-group\">\n      <div class=\"back\">\n        <button class=\"back-btn\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\">\n            <title>Return Down Back</title>\n            <path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"\n              d=\"M112 352l-64-64 64-64\" />\n            <path d=\"M64 288h294c58.76 0 106-49.33 106-108v-20\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"\n              stroke-linejoin=\"round\" stroke-width=\"32\" />\n          </svg>\n        </button>\n      </div>\n      <div class=\"forward\">\n        <button class=\"forward-btn\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\">\n            <title>Return Down Forward</title>\n            <path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"\n              d=\"M400 352l64-64-64-64\" />\n            <path d=\"M448 288H154c-58.76 0-106-49.33-106-108v-20\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"\n              stroke-linejoin=\"round\" stroke-width=\"32\" />\n          </svg>\n        </button>\n      </div>\n      <div class=\"clear\">\n        <button class=\"clear-btn\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\">\n            <title>Close Circle</title>\n            <path d=\"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z\" fill=\"none\"\n              stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\" />\n            <path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"\n              d=\"M320 320L192 192M192 320l128-128\" />\n          </svg>\n        </button>\n      </div>\n    </div>\n      <div class=\"selections-group\">\n    </div>     \n        ";
      el.innerHTML = html;
    }

    this.options.app.createSessionObject(this.options.def).then(function (model) {
      model.on('changed', _this.render.bind(_this));
      _this.options.model = model;

      _this.render();
    });
  }

  _createClass(SelectionBar, [{
    key: "render",
    value: function render() {
      var el = document.getElementById(this.elementId);
      this.options.model.getLayout().then(function (layout) {
        console.log(layout);

        if (layout.qSelectionObject.qSelections.length > 0) {
          el.innerHTML += layout.qSelectionObject.qSelections.map(function (selection) {
            return "<div class=\"selection-tabs\">\n              <div id=websyDropdown\">\n              <h5>".concat(selection.qField, "</h5>\n              <h6>").concat(selection.qSelected, "</h6>\n              </div>\n            </div>");
          });
          var dropdown = new WebsyDropdown('websyDropdown');
        } else {
          el.innerHTML += "\n          <div class=\"selection-tabs\">\n            <span>No selections applied</span>\n          </div>";
        }
      });
    }
  }, {
    key: "backSelection",
    value: function backSelection() {
      this.options.app.back();
      this.render();
    }
  }, {
    key: "forwardSelection",
    value: function forwardSelection() {
      this.options.app.forward();
      this.render();
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.options.app.clearAll();
      this.render();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('back-btn')) {
        this.backSelection();
      }

      if (event.target.classList.contains('forward-btn')) {
        this.forwardSelection();
      }

      if (event.target.classList.contains('clear-btn')) {
        this.clearSelection();
      }
    }
  }]);

  return SelectionBar;
}();

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/d077bbca-1fa2-4564-83d5-88f801899a5c'
});
session.open().then(function (global) {
  global.openDoc('d077bbca-1fa2-4564-83d5-88f801899a5c').then(function (app) {
    var selectionBar = new SelectionBar('websySelectionBar', {
      app: app
    });
  });
});

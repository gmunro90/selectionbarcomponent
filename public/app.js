"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
global
SelectionBar
include
enigma
schema
app
*/

/* global SelectionBar */
var SelectionBar = /*#__PURE__*/function () {
  function SelectionBar(elementId, options) {
    _classCallCheck(this, SelectionBar);

    this.elementId = elementId;
    var DEFAULTS = {};
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      var html = "\n       \n        ";
      el.innerHTML = html; // this.render()
    }
  } // render () {
  //   console.log('testing')
  // }


  _createClass(SelectionBar, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('bookmarkBtn')) {
        this.openForm();
      }
    }
  }]);

  return SelectionBar;
}();

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
});
session.open().then(function (global) {
  console.log(global);
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(function (app) {
    console.log(app);
    var bookmark = new SelectionBar('websy-selection-bar', {
      app: app
    });
  });
});

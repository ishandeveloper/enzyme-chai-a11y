"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessible = accessible;
exports.runAxe = runAxe;
exports.default = void 0;

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _axeCore = _interopRequireDefault(require("axe-core"));

var _chai = require("chai");

var _chalk = _interopRequireDefault(require("chalk"));

var _jestMatcherUtils = require("jest-matcher-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_enzyme.default.configure({
  adapter: new _enzymeAdapterReact.default()
});

function logVioloations(violations) {
  const lineBreak = "\n\n";
  const printViolations = violations.map((violation, idx) => {
    const errorBody = violation.nodes.map(node => {
      return `
#${idx + 1}:
Node: ${node.html}
Rule Description: ${(0, _jestMatcherUtils.printReceived)(`${violation.help} (${violation.id})`)}
Summary: ${_chalk.default.yellow(node.failureSummary)}
Help URL: ${_chalk.default.blue(violation.helpUrl)}
    `;
    }).join(lineBreak);
    return errorBody;
  });
  return `Expected the HTML to have no violations(total violations: ${printViolations.length}):${lineBreak} ${printViolations.join(lineBreak)}`;
}

function accessible(chai) {
  chai.Assertion.addMethod("accessible", function accessibleCb() {
    const violations = this._obj.violations; // eslint-disable-line no-underscore-dangle

    const audit = new chai.Assertion(violations);
    const pass = violations.length === 0;
    audit.assert(pass, logVioloations(violations));
  });
}

(0, _chai.use)(accessible);

function runAxe(_x, _x2) {
  return _runAxe.apply(this, arguments);
} // config: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter

/**
 * Runs the axe-core on passed component.
 * @param {node} app node to test
 * @param {object} config axe-core config
 * @param {object} enzymeConfig enzyme config
 */


function _runAxe() {
  _runAxe = _asyncToGenerator(function* (node, config) {
    const oldNode = global.Node;
    global.Node = node.ownerDocument.defaultView.Node; // axeCore.run: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axerun

    try {
      const results = yield _axeCore.default.run(node, config);
      global.Node = oldNode;
      return results;
    } catch (error) {
      global.Node = oldNode;
      throw error;
    }
  });
  return _runAxe.apply(this, arguments);
}

function auditA11y(_x3) {
  return _auditA11y.apply(this, arguments);
}

function _auditA11y() {
  _auditA11y = _asyncToGenerator(function* (app, config = {}, enzymeConfig = {}) {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const wrapper = (0, _enzyme.mount)(app, _objectSpread({
      attachTo: div
    }, enzymeConfig));
    const node = wrapper.getDOMNode();
    const results = yield runAxe(node, config);
    wrapper.unmount();
    document.body.removeChild(div);
    return results;
  });
  return _auditA11y.apply(this, arguments);
}

var _default = auditA11y;
exports.default = _default;
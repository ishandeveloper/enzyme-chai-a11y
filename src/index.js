import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axeCore from "axe-core";
import { use } from "chai";
import chalk from "chalk";
import { printReceived } from "jest-matcher-utils";

Enzyme.configure({ adapter: new Adapter() });

function logVioloations(violations) {
  const lineBreak = "\n\n";
  const printViolations = violations.map((violation, idx) => {
    const errorBody = violation.nodes
      .map(node => {
        return `
#${idx + 1}:
Node: ${node.html}
Rule Description: ${printReceived(`${violation.help} (${violation.id})`)}
Summary: ${chalk.yellow(node.failureSummary)}
Help URL: ${chalk.blue(violation.helpUrl)}
    `;
      })
      .join(lineBreak);

    return errorBody;
  });
  return `Expected the HTML to have no violations(total violations: ${
    printViolations.length
  }):${lineBreak} ${printViolations.join(lineBreak)}`;
}

export function accessible(chai) {
  chai.Assertion.addMethod("accessible", function accessibleCb() {
    const { violations } = this._obj; // eslint-disable-line no-underscore-dangle
    const audit = new chai.Assertion(violations);
    const pass = violations.length === 0;

    audit.assert(pass, logVioloations(violations));
  });
}

use(accessible);

export async function runAxe(node, config) {
  const oldNode = global.Node;
  global.Node = node.ownerDocument.defaultView.Node;

  // axeCore.run: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axerun
  try {
    const results = await axeCore.run(node, config);
    global.Node = oldNode;

    return results;
  } catch (error) {
    global.Node = oldNode;
    throw error;
  }
}

// config: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter
/**
 * Runs the axe-core on passed component.
 * @param {node} app node to test
 * @param {object} config axe-core config
 * @param {object} enzymeConfig enzyme config
 */
async function auditA11y(app, config = {}, enzymeConfig = {}) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const wrapper = mount(app, { attachTo: div, ...enzymeConfig });
  const node = wrapper.getDOMNode();

  const results = await runAxe(node, config);
  wrapper.unmount();
  document.body.removeChild(div);

  return results;
}

export default auditA11y;

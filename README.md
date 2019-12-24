# enzyme-chai-a11y

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/enzyme-chai-a11y.svg?style=flat-square)](https://npmjs.org/package/enzyme-chai-a11y)
[![Build Status](https://img.shields.io/travis//master.svg?style=flat-square)](https://travis-ci.org/) [![Coverage Status](https://img.shields.io/codecov/c/github//master.svg?style=flat-square)](https://codecov.io/gh//branch/master)

Accessibility testing plugin for chai based on axe-core

## Install

npm:

    npm i enzyme-chai-a11y --save-dev

Yarn:

    yarn add enzyme-chai-a11y --dev

## Usage

```js
import auditA11y, { accessible } from "enzyme-chai-a11y";
chai.use(accessible);

it('should not have accessibility violations', async () => {
    const results = await auditA11y(<p>test</p>);
    expect(results).to.be.accessible();
});
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [auditA11y](#audita11y)
    -   [Parameters](#parameters)

### auditA11y

Runs the axe-core on passed component.

#### Parameters

-   `app` **[node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)** node to test
-   `config` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** axe-core config (optional, default `{}`)
-   `enzymeConfig` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** enzyme config (optional, default `{}`)

## License

MIT © [Vikas Parashar](https://github.com/vikas-parashar)

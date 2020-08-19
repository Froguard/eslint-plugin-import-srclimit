# eslint-plugin-import-srclimits

> `stable_version` >= 1.0.0

Limit import source from some special folder in configuration

[![version](https://img.shields.io/npm/v/eslint-plugin-import-srclimits.svg "version")](https://www.npmjs.com/package/eslint-plugin-import-srclimits)&nbsp;
[![Build Status](https://img.shields.io/travis/Froguard/eslint-plugin-import-srclimits.svg)](https://travis-ci.org/Froguard/eslint-plugin-import-srclimits)&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/Froguard/eslint-plugin-import-srclimits.svg)](https://github.com/Froguard/eslint-plugin-import-srclimits/issues?q=is%3Aopen+is%3Aissue)&nbsp;
[![license](https://img.shields.io/github/license/froguard/eslint-plugin-import-srclimits.svg)](https://github.com/froguard/eslint-plugin-import-srclimits/blob/master/LICENSE)


## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-import-srclimits`:

```
$ npm install eslint-plugin-import-srclimits --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-import-srclimits` globally.

## Usage

Add `import-srclimit` to the plugins section of your `.eslintrc.js` configuration file. You can omit the `eslint-plugin-` prefix:

Set `parserOptions.sourceType` value as `module` in your configuration.

```js
module.exports = {
    // ...
    "plugins": [
        "import-srclimits"
    ],
    "parserOptions": { 
        "ecmaVersion": 2015, 
        "sourceType": "module" 
    }
    // ...
};
```

Then configure the rules you want to use under the rules section.

> The effect is: The files match in `files` pattern, can only import target match in `source` pattern

```js
module.exports = {
  // ...
  "rules": {
    "import-srclimits/srclimits": [
      "error", 
      {
        "files": ["./src/**/*.{js,vue,jsx}"],
        "source": ["./src/**/*.*", "node_modules/**", "!./mock/**/*.*"], 
        "errMsg": "The code of the files in the src folder, can't import source file in ./mock/**"
      }
    ]
  }
  // ...
};
```

option `files` & `source` can accepts `glob-pattern`, `regular-expression`, `function(str){/* return fasle|true; */}`


```js
module.exports = {
  // ...
  "rules": {
    "import-srclimits/srclimits": [
      "warn", 
      {
        "files": ["./src/**/*.{js,vue,jsx}"],
        "source": [
          (str) => (str.indexOf('util') == -1),
          /os/g
        ], 
        "errMsg": "Browser code could not use node module 'util' & 'os'!!!"
      }
    ]
  }
  // ...
};
```

> see more: [anymatch](https://www.npmjs.com/package/anymatch)

### Test

```
srclimits
    valid
      ✓ import qs from 'qs'; (48ms)
      ✓ import abc from 'qs/abc';
      ✓ import kapp from '@scopename/kapp';
      ✓ import abc from '@scopename/bbb/abc';
      ✓ import clone from '../utils/clone.js';
      ✓ import '../utils/clone.js';
      ✓ import '../utils/clone';
      ✓ import { clone } from '../utils/index.js';
      ✓ import { clone } from '../utils/';
      ✓ import { clone } from '../utils';
      ✓ import { clone as copy } from '../utils';
      ✓ import * as _ from '../utils/index.js';
    invalid
      ✓ import '../../mock/storage.js';
      ✓ import '../../mock/storage';
      ✓ import storage from '../../mock/storage.js';
      ✓ import storage from '../../mock/storage';
      ✓ import '../../mock/utils';
      ✓ import '../../mock/utils/';
      ✓ import * as _ from '../../mock/utils/index.js';
      ✓ import { addStyleTag } from '../../mock/utils/';
      ✓ import { addStyleTag as injectStyleDom } from '../../mock/utils/index';
      ✓ // multiple lines
        import { clone } from '../utils/';    // ✓
        import { base } from '../base/index'; // ✓
        import { addStyleTag as injectStyleDom } from '../../mock/utils/index'; // ✘
22 passing
```

### Others

- [eslint-plugin-no-methods](https://www.npmjs.com/package/eslint-plugin-no-methods)
- [eslint-plugin-no-inculdes](https://www.npmjs.com/package/eslint-plugin-no-includes)

> Created by yeoman tool.

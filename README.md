# eslint-plugin-import-srclimits

Disallow using the method methods

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

Add `import-srclimit` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

Set `parserOptions.sourceType` value as `module` in your configuration.

```json
{
    "plugins": [
        "import-srclimits"
    ],
    "parserOptions": { 
        "ecmaVersion": 2015, 
        "sourceType": "module" 
    } 
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "import-srclimits/srclimits": [
      "error", 
      {
        "files": ["./src/**/*.{js,vue,jsx}"],
        "source": ["./src/**/*.*", "node_modules/**", "!./web/**/*.*"], 
        "errMsg": "The code in the file in the src folder, can't import source file in ./web/**"
      }
    ]
  }
}
```

> Created by yeoman tool.

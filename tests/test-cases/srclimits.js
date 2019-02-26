/**
 * @fileoverview limit import source from some special folder in configuration
 * @author froguard
 */
//------------------------------------------------------------------------------
// Test Cases
//------------------------------------------------------------------------------

// eslint.RuleTester is string-compare ,which via error.message, so you must keep same value between errors and errMsg
const errMsg = 'The code in the file in the src folder, can\'t import source file in ./web/**';
const errors = [{ message: errMsg}];
const options = [
    {
        files: ['./src/**/*.{js,vue,jsx}'],
        source: ['./src/**/*.*', "node_modules/**", '!./web/**/*'],
        errMsg: "The code in the file in the src folder, can't import source file in ./web/**"
    }
];

//
module.exports = {
    valid: [
        {
            code: "import clone from '../utils/clone.js';",
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../utils/clone.js';",
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../utils/clone';", // remove '.js' ext
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import { clone } from '../utils/index.js';",
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import { clone } from '../utils/';", // remove 'index.js'
            options,
            filename: './src/components/banner.js'
        },

        {
            code: "import { clone } from '../utils';", // remove '/index.js'
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import { clone as copy } from '../utils';", // remove '/index.js'
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import * as _ from '../utils/index.js';",
            options,
            filename: './src/components/banner.js'
        }
    ],
    invalid: [
        {
            code: "import '../../web/storage.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../web/storage';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import storage from '../../web/storage.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import storage from '../../web/storage';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../web/utils';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../web/utils/';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import * as _ from '../../web/utils/index.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import { addStyleTag } from '../../web/utils/';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import { addStyleTag as injectStyleDom } from '../../web/utils/index';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: `// multiple lines
         import { clone } from '../utils/';    // √
         import { base } from '../base/index'; // √
         import { addStyleTag as injectStyleDom } from '../../web/utils/index'; // ✘
         `,
            options,
            errors,
            filename: './src/components/banner.js'
        }
    ]
};
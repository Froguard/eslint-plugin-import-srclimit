/**
 * @fileoverview limit import source from some special folder in configuration
 * @author froguard
 */
//------------------------------------------------------------------------------
// Test Cases
//------------------------------------------------------------------------------

// eslint.RuleTester is string-compare ,which via error.message, so you must keep same value between errors and errMsg
const errMsg = 'The code in the file in the src folder, can\'t import source file in ./mock/**';
const errors = [{ message: errMsg}];
const options = [
    {
        files: ['./src/**/*.{js,vue,jsx}'],
        source: ['./src/**/*', "node_modules/**", '!./mock/**/*'],
        errMsg
    }
];

//
module.exports = {
    valid: [
        {
            code: "import qs from 'qs';", // packageName
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import abc from 'qs/abc';", // packageName/subDirectory
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import kapp from '@kaola/kapp';", // @scopeName/packageName
            options,
            filename: './src/components/banner.js'
        },
        {
            code: "import abc from '@kaola/kapp/abc';", // @scopeName/packageName/subDirectory
            options,
            filename: './src/components/banner.js'
        },
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
            code: "import '../../mock/storage.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../mock/storage';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import storage from '../../mock/storage.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import storage from '../../mock/storage';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../mock/utils';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import '../../mock/utils/';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import * as _ from '../../mock/utils/index.js';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import { addStyleTag } from '../../mock/utils/';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: "import { addStyleTag as injectStyleDom } from '../../mock/utils/index';",
            options,
            errors,
            filename: './src/components/banner.js'
        },
        {
            code: `// multiple lines
         import { clone } from '../utils/';    // √
         import { base } from '../base/index'; // √
         import { addStyleTag as injectStyleDom } from '../../mock/utils/index'; // ✘
         `,
            options,
            errors,
            filename: './src/components/banner.js'
        }
    ]
};
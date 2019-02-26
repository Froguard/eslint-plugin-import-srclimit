/**
 * @fileoverview limit import source from some special folder in configuration
 * @author froguard
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
let paramFormat = require('../utils/param-format');
let path = require('path');
let anyMatch = require('anymatch');
const CWD = process.cwd();

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [
            {
                type: "object",
                properties: {
                    files: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        maxItems: 50,
                        uniqueItems: true
                    },
                    source: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        minItems: 1,
                        maxItems: 50,
                        uniqueItems: true
                    },
                    errMsg: {
                        type: "string"
                    }
                }
            }
        ]
    },
    create(context) {
        let filename = (context.getFilename && context.getFilename())
            || (context.eslint && context.eslint.getFilename && context.eslint.getFilename())
            || '';

        let dirname = path.dirname(filename);

        let config = context.options[0] || {};
        let { files, source, errMsg} = config || {};
        // matchers
        let fileMatchers = paramFormat(files);
        let sourceMatchers = paramFormat(source);

        // console.log(`fileMatchers=${JSON.stringify(fileMatchers, null, 2)}\nsourceMatchers=${JSON.stringify(sourceMatchers, null, 2)}`);

        return {
            ImportDeclaration: function (node) {
                let srcObj = node.source;
                let src = srcObj.value || '';
                let srcM = path.posix.relative(CWD, path.posix.join(dirname, src));
                let flnM = path.posix.relative(CWD, filename);
                let srcBase = path.posix.basename(src);

                // console.log(`src='${src}'\nsrcM='${srcM}'\nsrcBase=${srcBase}\nflnM='${flnM}'`);

                let err = false;
                if (anyMatch(fileMatchers, flnM)){
                    if (src.indexOf(path.sep) === -1 || src.match(/^@.+\/.+/)) {
                        /*
                         * import packagename 'xxx' or '@scope/xxx'
                         * eg: import 'qs';
                         * eg: import '@kaola/kapp';
                         */
                        err = false;
                    } else if (srcBase.match(/.+\..+$/)) {
                        /* normal import
                         * eg: import 'a.js'
                         */
                        if(!anyMatch(sourceMatchers, srcM)){
                            err = true;
                        }
                    } else {
                        /* special import:
                         * eg: import 'a';
                         * eg: import 'a/'; //'a'(same as 'a/') is short for 'a.js' or 'a/index.js'
                         */
                        /*if (srcBase === 'index' && !anyMatch(sourceMatchers, `${srcM}/index.js`)) {
                            err = true;
                        } else */if(!anyMatch(sourceMatchers, `${srcM}.js`) || !anyMatch(sourceMatchers, `${srcM}/index.js`) ){
                            err = true;
                        }
                    }
                }
                err && context.report(node.source || node, errMsg);
            }
        };
    }
};





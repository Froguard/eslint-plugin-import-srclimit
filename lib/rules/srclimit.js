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
        let filename = context.eslint && context.eslint.getFilename();
        let dirname = path.dirname(filename);
        let config = context.options[0] || {};
        let { files, source, errMsg} = config || {};
        // matchers
        let fileMatchers = paramFormat(files);
        let sourceMatchers = paramFormat(source);
        return {
            ImportDeclaration: function (node) {
                let srcObj = node.source;
                let src = srcObj.value || '';
                let srcM = path.relative(CWD, path.join(dirname, src));
                let flnM = path.relative(CWD, filename);
                let srcBase = path.basename(src);

                // console.log(`srcM='${srcM}'\nsrcBase=${srcBase}\nflnM='${flnM}'`);

                let err = false;
                if (anyMatch(fileMatchers, flnM)){
                    if (srcBase.match(/.+\..+$/)) {
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
                err && context.report(node, errMsg);
            }
        };
    }
};





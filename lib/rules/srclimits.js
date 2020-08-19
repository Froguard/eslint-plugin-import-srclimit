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

        const DIR_NAME = path.dirname(filename);

        let config = context.options[0] || {};
        let { files = [], source = ['*'], errMsg} = config || {};
        // matchers
        let fileMatchers = paramFormat(files);
        let sourceMatchers = paramFormat(source);

        // console.log(`fileMatchers=${JSON.stringify(fileMatchers, null, 2)}\nsourceMatchers=${JSON.stringify(sourceMatchers, null, 2)}`);

        return {
            ImportDeclaration: function (node) {
                let srcObj = node.source;
                let src = srcObj.value || ''; // raw src value
                 // srcRel & flnRel 相对于命令执行根目录，一般为「相对于.eslintrc.js文件的路径」
                let srcRel = path.posix.relative(CWD, path.posix.join(DIR_NAME, src));
                let flnRel = path.posix.relative(CWD, filename);
                // 抛开文件夹等前缀路径，文件名，如 a/b/c/d.js ---> d.js
                let srcBase = path.posix.basename(src);

                // console.log(`src='${src}'\nsrcRel='${srcRel}'\nsrcBase='${srcBase}'\nflnRel='${flnRel}'`);

                let err = false;
                if (anyMatch(fileMatchers, flnRel)){
                    if (src.match(/^[./].*/)) { // 本地路径
                        /*
                         * import relative local path
                         * eg: import './lib/index.js';
                         * eg: import '../com/utils.js';
                         */
                        if(!anyMatch(sourceMatchers, srcRel)) {
                            err = true;
                        }                        
                    } else if ( // npm 包
                        src.match(/^@.+\/.+/) // @scopeName/xxx
                        || src.match(/^[^./].*\/.+/) // pkgName/xxx
                        || src.indexOf(path.sep) === -1 // pkgName or @scopeName
                    ) {
                        /*
                         * import packagename 'pkgName' or 'pkgName/xx/xx' or '@scope/pkgName'
                         * eg: import 'qs';
                         * eg: import '@kaola/kapp';
                         * eg: import 'json-toy/lib/typeOf';
                         */
                        if (!anyMatch(sourceMatchers, src)) {
                            err = true;
                        }
                    } else {
                        err = false;                        
                    }
                }
                err && context.report(node.source || node, errMsg);
            }
        };
    }
};





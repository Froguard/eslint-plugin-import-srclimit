let util = require('util');
let uniqueify = require('./uniqueify');

/**
 * Array of glob | regex | function
 * @param param
 * @returns {(string|regex|function)[]}
 */
module.exports = function paramFormat(param){
    let res =  ["./*"];
    if (util.isArray(param)) {
        res = uniqueify(param);
    } else {
        let tp = typeof(param);
        res = (tp === 'string' || tp === 'function' || util.isRegExp(param)) ? [param] : res;
    }
    return res;
};
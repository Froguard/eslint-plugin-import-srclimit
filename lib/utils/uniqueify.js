/**
 * uniqueify
 * @param {array} arr
 * @param {function} getSeed
 * @param {function} deal
 * @return {array}
 */
module.exports = function uniqueify(arr = [], getSeed = null, deal = null) {
    let tmp = [];
    let getSeedFn = typeof getSeed === 'function' ? getSeed : a => a;
    let dealFn = typeof deal === 'function' ? deal : 0;
    return arr.filter((a) => {
        let seed = getSeedFn(a);
        return !tmp.includes(seed) && tmp.push(seed) && (dealFn && dealFn(a) || 1);
    });
};
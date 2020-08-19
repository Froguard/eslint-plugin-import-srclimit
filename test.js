'use strict';
const path = require('path');
const anyMatch = require('anymatch');

console.log(path.basename('@abc')); // @abc

const testCase = [
    { matchers: ['@wf/**/*'], str: '@wf/index.js' }, // true
    { matchers: ['!@wf/**/*'], str: '@wf/index.js' }, // false
    { matchers: [
        (s) => !['@xyz'].some(k => s.indexOf(k) != -1)
    ], str: '@xyz/index.js' }, // false
    { matchers: [
        (s) => !['@wxyz'].some(k => s.indexOf(k) != -1)
    ], str: '@xyz/index.js' }, // true
];

testCase.forEach(({matchers, str}) => console.log('tc:', anyMatch(matchers, str)));

// 

console.log('pkg/a/b/c'.match(/^[^./]+\/.+/)); // √
console.log('pkg/a'.match(/^[^./]+\/.+/)); // √
console.log('/pkg/a/b/c'.match(/^[^./]+\/.+/)); // null
console.log('/pkg/a'.match(/^[^./]+\/.+/)); // null

console.log(anyMatch(['*'], 'index.js')); // true
console.log(anyMatch([], 'index.js')); // false
console.log(anyMatch(['!./mock/*'], 'index.js')); // true
console.log(anyMatch(['./mock/*'], 'index.js')); // false

console.log(anyMatch(['./mock/*'], 'mock/storage.js')); // true
console.log(anyMatch(['!./mock/*'], 'mock/storage.js')); // false

console.log(anyMatch(['./mock/**/*'], 'mock/storage.js')); // true
console.log(anyMatch(['!./mock/**/*'], 'mock/storage.js')); // false

console.log(anyMatch([ './src/**/*', 'node_modules/**', '!./mock/**/*' ], 'mock/storage.js')); // false




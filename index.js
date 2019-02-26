/**
 * @fileoverview limit import source from some special folder in configuration
 * @author froguard
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let srclimit = require('./lib/rules/srclimit');


//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

let rules = {};

module.exports.rules = Object.assign(rules, {
    "srclimit": srclimit
});




/**
 * @fileoverview limit import source from some special folder in configuration
 * @author froguard
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let srclimits = require('./lib/rules/srclimits');


//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

let rules = {};

module.exports.rules = Object.assign(rules, {
    "srclimits": srclimits
});

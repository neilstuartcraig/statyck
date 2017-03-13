"use strict";

// Deps - core

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserConfig(projectBaseDirectory, callback) {
    if (!(typeof projectBaseDirectory === 'string')) {
        throw new TypeError("Value of argument \"projectBaseDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(projectBaseDirectory));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    let err = null;
    let statyckConfig = {};

    try {
        // Core Statyck config file - likely users won't need to edit this
        const coreConfigFilename = _path2.default.join(projectBaseDirectory, "statyck-config", "statyck-config.json");

        // Theme config file - users will need to edit this to some extent - e.g. setting title etc. hence it's JSON, should make it easier for users and theme installers alike
        const themeConfigFilename = _path2.default.join(projectBaseDirectory, "statyck-config", "theme-config.json");

        // NOTE: Could add source-control/deploy config here too

        // NOTE: import can't be used here as it's mandatory that its path is static (can't contain vars) & that it's used in the top-level scope
        let coreConfig = require(coreConfigFilename);
        let themeConfig = require(themeConfigFilename);

        // Form statyckConfig from core and theme config
        statyckConfig = coreConfig;
        statyckConfig.theme = themeConfig;
    } catch (e) {
        err = e;
    }

    return callback(err, statyckConfig);
}

module.exports = getUserConfig;

function _inspect(input, depth) {
    const maxDepth = 4;
    const maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            if (depth > maxDepth) return '[...]';

            const first = _inspect(input[0], depth);

            if (input.every(item => _inspect(item, depth) === first)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        const keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        const indent = '  '.repeat(depth - 1);
        let entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}
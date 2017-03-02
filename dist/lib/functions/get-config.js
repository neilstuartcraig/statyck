"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConfig(currentDirectory = "", configFilename = "statyck-config.js", callback) {
    if (!(typeof currentDirectory === 'string')) {
        throw new TypeError("Value of argument \"currentDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(currentDirectory));
    }

    if (!(typeof configFilename === 'string')) {
        throw new TypeError("Value of argument \"configFilename\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(configFilename));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    let err = null;
    let config = {};

    let configFileToLoad = configFilename;

    // If no configFilename was specified, use the default location of <project root>/config/statyck-config.js
    if (configFileToLoad === "") {
        // NOTE: Using path.join is good for x-platform ops
        configFileToLoad = _path2.default.resolve(currentDirectory, "config", "statyck-config.js");
    }

    // NOTE: import/require is sync AFAIK
    // TODO: Is this going to cause issues WRT being async > try/catch
    try {
        config = require(configFileToLoad);
    } catch (e) {
        err = new Error(`Can't open config file from ${ configFileToLoad }. Please check the file exists and that permissions are set correctly.`);
    }

    return callback(err, config);
}

module.exports = getConfig;

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
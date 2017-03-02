"use strict";

// Deps - core

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFileTitle(filename, filenameExtension, callback) {
    if (!(typeof filename === 'string')) {
        throw new TypeError("Value of argument \"filename\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filename));
    }

    if (!(typeof filenameExtension === 'string')) {
        throw new TypeError("Value of argument \"filenameExtension\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filenameExtension));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // TODO: This needs better scrutiny and defensiveness    
    const reg = new RegExp(filenameExtension + "$");
    const f = _path2.default.basename(filename);

    if (!(typeof f === 'string')) {
        throw new TypeError("Value of variable \"f\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(f));
    }

    const title = f.replace(reg, "") || "";

    if (!(typeof title === 'string')) {
        throw new TypeError("Value of variable \"title\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(title));
    }

    return callback(title);
}

module.exports = getFileTitle;

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
"use strict";

// Core deps

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createIndex(context, templateString, currentIndexNumber, totalNumberOfIndexes, outputPathAndFilename, writeOutputFile, callback) {
    if (!(context instanceof Object)) {
        throw new TypeError("Value of argument \"context\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(context));
    }

    if (!(typeof templateString === 'string')) {
        throw new TypeError("Value of argument \"templateString\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(templateString));
    }

    if (!(typeof currentIndexNumber === 'number')) {
        throw new TypeError("Value of argument \"currentIndexNumber\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(currentIndexNumber));
    }

    if (!(typeof totalNumberOfIndexes === 'number')) {
        throw new TypeError("Value of argument \"totalNumberOfIndexes\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(totalNumberOfIndexes));
    }

    if (!(typeof outputPathAndFilename === 'string')) {
        throw new TypeError("Value of argument \"outputPathAndFilename\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(outputPathAndFilename));
    }

    if (!(typeof writeOutputFile === 'boolean')) {
        throw new TypeError("Value of argument \"writeOutputFile\" violates contract.\n\nExpected:\nboolean\n\nGot:\n" + _inspect(writeOutputFile));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // TODO: use createOutputFile once it's broken out
    const template = _handlebars2.default.compile(templateString);
    const ctx = context;
    ctx.indexes = {
        current: currentIndexNumber,
        total: totalNumberOfIndexes
    };
    const outputData = template(ctx);

    // TODO: Consider moving the file write into index - keep this fn testable without mocks, would also eliminate 2 x args
    if (writeOutputFile === true) {
        _fs2.default.writeFile(outputPathAndFilename, outputData, writeErr => {
            return callback(writeErr, outputData);
        });
    } else // Don't write a file out, just return the index
        {
            return callback(null, outputData);
        }
}

// 3rd party deps


module.exports = createIndex;

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
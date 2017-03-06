"use strict";

// Core deps

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _createDirRec = require("./create-dir-rec.js");

var _createDirRec2 = _interopRequireDefault(_createDirRec);

var _createOutputFile = require("./create-output-file.js");

var _createOutputFile2 = _interopRequireDefault(_createOutputFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Macro-function to create one or more output files - that is, take an Array of items and push each one through a template to create an output file


// 3rd party deps

// Local deps
function createOutputFiles(template, items, context, outputDir, callback) {
    if (!(typeof template === 'string')) {
        throw new TypeError("Value of argument \"template\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(template));
    }

    if (!Array.isArray(items)) {
        throw new TypeError("Value of argument \"items\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(items));
    }

    if (!(context instanceof Object)) {
        throw new TypeError("Value of argument \"context\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(context));
    }

    if (!(typeof outputDir === 'string')) {
        throw new TypeError("Value of argument \"outputDir\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(outputDir));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Create the output (destination) directory, if it doesn't exist
    (0, _createDirRec2.default)(outputDir, CODErr => {
        if (CODErr) {
            return callback(CODErr);
        }

        const totalNumItems = items.length;
        let numItemsProcessed = 0;

        // Create an output file for each item
        items.map(item => {
            const outputPathAndFilename = _path2.default.resolve(outputDir, item.filename);

            let ctx = {
                content: item
            };

            // Copy in additional context (excluding any clashes with existing context data)
            for (let c in context) {
                if (ctx[c] === undefined) {
                    ctx[c] = context[c];
                }
            }

            (0, _createOutputFile2.default)(template, ctx, outputPathAndFilename, COFErr => {
                numItemsProcessed++;

                if (numItemsProcessed >= totalNumItems) {
                    // return callback("err array");
                    return callback(COFErr); // This needs to become an array of errors
                }
            });
        });
    });
}

module.exports = createOutputFiles;

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
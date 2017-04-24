"use strict";

// Deps - local

var _createIndex = require("./create-index.js");

var _createIndex2 = _interopRequireDefault(_createIndex);

var _splitItems = require("./split-items.js");

var _splitItems2 = _interopRequireDefault(_splitItems);

var _createIndexMetadata = require("./create-index-metadata.js");

var _createIndexMetadata2 = _interopRequireDefault(_createIndexMetadata);

var _createIndexFilename = require("./create-index-filename.js");

var _createIndexFilename2 = _interopRequireDefault(_createIndexFilename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createIndexes(items, numberOfItemsPerIndexPage, template, themeSettings, additionalContext, outputDir, writeOutputFile, callback) {
    if (!Array.isArray(items)) {
        throw new TypeError("Value of argument \"items\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(items));
    }

    if (!(typeof numberOfItemsPerIndexPage === 'number')) {
        throw new TypeError("Value of argument \"numberOfItemsPerIndexPage\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(numberOfItemsPerIndexPage));
    }

    if (!(typeof template === 'string')) {
        throw new TypeError("Value of argument \"template\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(template));
    }

    if (!(themeSettings instanceof Object)) {
        throw new TypeError("Value of argument \"themeSettings\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(themeSettings));
    }

    if (!(additionalContext instanceof Object)) {
        throw new TypeError("Value of argument \"additionalContext\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(additionalContext));
    }

    if (!(typeof outputDir === 'string')) {
        throw new TypeError("Value of argument \"outputDir\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(outputDir));
    }

    if (!(typeof writeOutputFile === 'boolean')) {
        throw new TypeError("Value of argument \"writeOutputFile\" violates contract.\n\nExpected:\nboolean\n\nGot:\n" + _inspect(writeOutputFile));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Fast fail for any occurences of empty items arrays
    if (items.length === 0) {
        const ILErr = new Error("items array is empty! Cannot proceed");
        return callback(ILErr, "");
    }

    (0, _splitItems2.default)(items, numberOfItemsPerIndexPage, (SOErr, itemsArray) => {
        if (SOErr) {
            return callback(SOErr, "");
        }

        let numItemsProcessed = 0;
        const totalNumItems = itemsArray.length;
        const indexPathPrefix = outputDir; // NOTE: This is the path into which the index file will be written, not the HRef path prefix

        itemsArray.map((item, currentIndexNum) => {
            // TODO: sort the path prefix from config         
            (0, _createIndexMetadata2.default)(currentIndexNum, totalNumItems, "", indexMetadata => {
                const context = {
                    items: item,
                    indexMetadata: indexMetadata,
                    theme: themeSettings
                };

                // Copy in additional context (excluding any clashes with existing context data)
                for (let a in additionalContext) {
                    if (context[a] === undefined) {
                        context[a] = additionalContext[a];
                    }
                }

                (0, _createIndexFilename2.default)(currentIndexNum, indexPathPrefix, indexFilename => {
                    (0, _createIndex2.default)(context, template, currentIndexNum, totalNumItems - 1, indexFilename, writeOutputFile, (CIErr, index) => // eslint-disable-line consistent-return, no-loop-func
                    {
                        numItemsProcessed++;

                        if (CIErr || numItemsProcessed >= itemsArray.length) {

                            // TODO: FIXUP! index is the LAST index created, this should really be an array of all created indexes                            
                            return callback(CIErr, index);
                        }
                    });
                });
            });
        });
    });
}

module.exports = createIndexes;

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
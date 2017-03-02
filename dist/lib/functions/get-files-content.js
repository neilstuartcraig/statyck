"use strict";

// Deps - core

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _getFileContentAsHtml = require("./get-file-content-as-html.js");

var _getFileContentAsHtml2 = _interopRequireDefault(_getFileContentAsHtml);

var _getFileMetadata = require("./get-file-metadata.js");

var _getFileMetadata2 = _interopRequireDefault(_getFileMetadata);

var _getFileTitle = require("./get-file-title.js");

var _getFileTitle2 = _interopRequireDefault(_getFileTitle);

var _createSlug = require("./create-slug.js");

var _createSlug2 = _interopRequireDefault(_createSlug);

var _createFilenameFromSlug = require("./create-filename-from-slug");

var _createFilenameFromSlug2 = _interopRequireDefault(_createFilenameFromSlug);

var _createUri = require("./create-uri.js");

var _createUri2 = _interopRequireDefault(_createUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove numItemsPerIndexPage

// Deps - local
function getFilesContent(sourceDirectory, filesArray, filenameExtension, themeSettings, numItemsPerIndexPage, outputDirectory, callback) {
    if (!(typeof sourceDirectory === 'string')) {
        throw new TypeError("Value of argument \"sourceDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(sourceDirectory));
    }

    if (!Array.isArray(filesArray)) {
        throw new TypeError("Value of argument \"filesArray\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(filesArray));
    }

    if (!(typeof filenameExtension === 'string')) {
        throw new TypeError("Value of argument \"filenameExtension\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filenameExtension));
    }

    if (!(themeSettings instanceof Object)) {
        throw new TypeError("Value of argument \"themeSettings\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(themeSettings));
    }

    if (!(typeof numItemsPerIndexPage === 'number')) {
        throw new TypeError("Value of argument \"numItemsPerIndexPage\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(numItemsPerIndexPage));
    }

    if (!(typeof outputDirectory === 'string')) {
        throw new TypeError("Value of argument \"outputDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(outputDirectory));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Outputs
    let err = null;

    // let ret = {}; // eslint-disable-line object-curly-newline
    let ret = [];

    // Working vars
    let numFilesProcessed = 0;

    const totalNumFiles = filesArray.length;

    filesArray.map(f => {
        // Working vars
        const filename = _path2.default.resolve(sourceDirectory, f);

        (0, _getFileTitle2.default)(filename, filenameExtension, title => {
            (0, _createSlug2.default)(title, slug => {
                (0, _createFilenameFromSlug2.default)(slug, outputFilename => {
                    (0, _createUri2.default)(themeSettings.scheme, themeSettings.hostname, themeSettings.baseURI, outputDirectory, slug, themeSettings.createAbsoluteHRefs, (GAUErr, URI) => {
                        if (GAUErr) {
                            return callback(GAUErr, []);
                        }

                        (0, _getFileMetadata2.default)(filename, (GFMErr, fileMetadata) => {
                            if (GFMErr) {
                                return callback(GFMErr, []);
                            }

                            (0, _getFileContentAsHtml2.default)(filename, (GFCAHErr, HTML) => {
                                if (GFCAHErr) {
                                    return callback(GFCAHErr, []);
                                }

                                numFilesProcessed = numFilesProcessed + 1;

                                // We need to set all the obj props here otherwise we'll suffer context issues WRT async-ness
                                let item = {
                                    absoluteURI: URI,
                                    filename: outputFilename,
                                    title: title,
                                    slug: slug,
                                    metadata: fileMetadata,
                                    HTML: HTML
                                };

                                ret.push(item);

                                if (numFilesProcessed >= totalNumFiles) {
                                    // We're done
                                    return callback(err, ret);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = getFilesContent;

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
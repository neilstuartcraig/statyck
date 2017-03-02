"use strict";

// Core deps

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _createOutputDir = require("./lib/functions/create-output-dir.js");

var _createOutputDir2 = _interopRequireDefault(_createOutputDir);

var _copyAssetFiles = require("./lib/functions/copy-asset-files.js");

var _copyAssetFiles2 = _interopRequireDefault(_copyAssetFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Deps - local
function init(projectBaseDirectory, callback) {
    if (!(typeof projectBaseDirectory === 'string')) {
        throw new TypeError("Value of argument \"projectBaseDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(projectBaseDirectory));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // create ./config/ dir
    const configDir = _path2.default.join(projectBaseDirectory, "conf");
    (0, _createOutputDir2.default)(configDir, CDErr => {
        if (CDErr) {
            return callback(CDErr);
        }

        // we'll do a simple copy of the config "template" (they're not really templates) files
        const configTemplateDir = _path2.default.join(__dirname, "..", "config-templates");

        (0, _copyAssetFiles2.default)(configTemplateDir, configDir, CAErr => {
            if (CAErr) {
                return callback(CAErr);
            }

            // Create content-source dir
            const contentSourceSourceDir = _path2.default.join(__dirname, "..", "content-source");
            const contentSourceDestinationDir = _path2.default.join(projectBaseDirectory, "content-source");
            (0, _copyAssetFiles2.default)(contentSourceSourceDir, contentSourceDestinationDir, CSErr => {
                if (CSErr) {
                    return callback(CSErr);
                }

                // Copy default theme into proj dir
                const themeSourceDir = _path2.default.join(__dirname, "..", "themes", "default");
                const themeDestinationDir = _path2.default.join(projectBaseDirectory, "themes", "default");
                (0, _copyAssetFiles2.default)(themeSourceDir, themeDestinationDir, TErr => {
                    return callback(TErr);
                });
            });
        });
    });
} // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd
// import createOutputFile from "./functions/create-output-file.js";


module.exports = init;

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
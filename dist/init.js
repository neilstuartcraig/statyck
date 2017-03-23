"use strict";

// Core deps

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _createDirRec = require("./lib/functions/create-dir-rec.js");

var _createDirRec2 = _interopRequireDefault(_createDirRec);

var _recCopyFiles = require("./lib/functions/rec-copy-files.js");

var _recCopyFiles2 = _interopRequireDefault(_recCopyFiles);

var _statyckAppConfig = require("../config/statyck-app-config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: Path is relative to build dir (dist/) - local because lib is babel'd
// import createOutputFile from "./functions/create-output-file.js";
function init(projectBaseDirectory, callback) {
    if (!(typeof projectBaseDirectory === 'string')) {
        throw new TypeError("Value of argument \"projectBaseDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(projectBaseDirectory));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // create ./config/ dir
    const configDir = _path2.default.join(projectBaseDirectory, _statyckAppConfig.production.userlandConfigDestinationDirectory);
    (0, _createDirRec2.default)(configDir, CDErr => {
        if (CDErr) {
            return callback(CDErr);
        }

        // we'll do a simple copy of the config "template" (they're not really templates) files
        const configTemplateDir = _path2.default.join(__dirname, "..", _statyckAppConfig.production.userlandConfigTemplateSourceDirectory);

        (0, _recCopyFiles2.default)(configTemplateDir, configDir, CAErr => {
            if (CAErr) {
                return callback(CAErr);
            }

            // Create content-source dir
            const contentSourceSourceDir = _path2.default.join(__dirname, "..", _statyckAppConfig.production.contentSourceBaseDir);
            const contentSourceDestinationDir = _path2.default.join(projectBaseDirectory, _statyckAppConfig.production.contentSourceBaseDir);
            (0, _recCopyFiles2.default)(contentSourceSourceDir, contentSourceDestinationDir, CSErr => {
                if (CSErr) {
                    return callback(CSErr);
                }

                // Copy default theme into proj dir
                const themeSourceDir = _path2.default.join(__dirname, "..", _statyckAppConfig.production.themesSourceDirectory, _statyckAppConfig.production.defaultThemeDirectory);
                const themeDestinationDir = _path2.default.join(projectBaseDirectory, _statyckAppConfig.production.themesSourceDirectory, _statyckAppConfig.production.defaultThemeDirectory);
                (0, _recCopyFiles2.default)(themeSourceDir, themeDestinationDir, TErr => {
                    return callback(TErr);
                });
            });
        });
    });
}

// App config (not user config - fixed location)


// Deps - local


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
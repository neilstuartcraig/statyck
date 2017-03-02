"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFilesFromDir(dirName, fileExtension, callback) {
    if (!(typeof dirName === 'string')) {
        throw new TypeError("Value of argument \"dirName\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(dirName));
    }

    if (!(typeof fileExtension === 'string')) {
        throw new TypeError("Value of argument \"fileExtension\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(fileExtension));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Read all files (except . and ..) in the specified dirName
    _fs2.default.readdir(dirName, (readErr, fileList) => {
        // Defaults
        let err = null;
        let files = [];

        if (readErr) {
            err = readErr;
        } else {

            // SPLIT            
            // Filter the dir listing to include only file with matching file extension
            const filteredFiles = fileList.filter(filename => {
                // Note that fileExtension should include a leading . if the filenames require it
                const regex = new RegExp(fileExtension + "$");

                // Note: this string match will return either null for no match or the file extension if it does match
                const matches = filename.match(regex);

                // Boolean-ify the returned value to allow the filter to work properly
                return matches === null ? false : true;
            });

            // SPLIT
            files = filteredFiles.sort((a, b) => {
                const pathA = _path2.default.join(dirName, a);
                const aCTime = _fs2.default.statSync(pathA).birthtime;
                const aCTimeTS = new Date(aCTime).getTime();

                const pathB = _path2.default.join(dirName, b);
                const bCTime = _fs2.default.statSync(pathB).birthtime;
                const bCTimeTS = new Date(bCTime).getTime();

                return bCTimeTS - aCTimeTS;
            });
        }

        return callback(err, files);
    });
}

module.exports = getFilesFromDir;

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
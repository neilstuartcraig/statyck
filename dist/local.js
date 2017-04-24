"use strict";

// Core deps

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _statyckLib = require("./lib/statyck-lib.js");

var _statyckLib2 = _interopRequireDefault(_statyckLib);

var _statyckAppConfig = require("../config/statyck-app-config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Deps - local
function local(projectBaseDirectory, callback) {
    if (!(typeof projectBaseDirectory === 'string')) {
        throw new TypeError("Value of argument \"projectBaseDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(projectBaseDirectory));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    _statyckLib2.default.getUserConfig(projectBaseDirectory, (GUCErr, statyckConfig) => {
        if (GUCErr) {
            return callback(GUCErr);
        }

        const server = _http2.default.createServer((req, res) => {
            // Remove any query strings from the request URL
            const requestURLNoQS = req.url.replace(/\?.*/g, "");

            // Remap requests for / or "" to index filename
            let requestedPath = requestURLNoQS;
            if (requestURLNoQS === "/" || requestURLNoQS === "") {
                requestedPath = _statyckAppConfig.production.postsIndexFilename;
            }

            // NOTE: I *think* (counter to what seems obvious) this is *not* susceptible to path traversal - at least that didn't work in my testing
            const reqPath = _path2.default.join(projectBaseDirectory, statyckConfig.general.outputBaseDir, _statyckAppConfig.production.outputDirectorySymlink, requestedPath);

            _fs2.default.readFile(reqPath, (FSErr, data) => {
                // Probably a bad assumption but we'll 404 any failures
                if (FSErr) {
                    res.statusCode = 404;
                    res.end();
                } else {
                    // Content-Type header
                    const ext = _path2.default.extname(reqPath);
                    const contentType = _statyckAppConfig.production.mimeTypes[ext] || _statyckAppConfig.production.defaultMimeType;
                    res.setHeader("Content-Type", contentType);

                    // Output the content we read from disc, in binary form (from the Buffer which readFile() returns)
                    res.end(data, "binary");
                }
            });
        });

        // Issue a (hopefully useful message to the user so they can click on it or copy/paste)
        console.log(`Local server running at http://127.0.0.1:${statyckConfig.general.localServerPort}/ - hit ctrl+c to stop`);

        server.listen(statyckConfig.general.localServerPort);
    });
} // NOTE: Path is relative to build dir (dist/) - local because lib is babel'd

// App config (not user config - fixed location)


module.exports = local;

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
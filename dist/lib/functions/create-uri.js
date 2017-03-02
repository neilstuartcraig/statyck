"use strict";

// Deps - core

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: This currently doesn't allow use of non-standard ports
function createURI(scheme, hostname, basePath, outputDirectory, slug, createAbsoluteURI, callback) {
    if (!(typeof scheme === 'string')) {
        throw new TypeError("Value of argument \"scheme\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(scheme));
    }

    if (!(typeof hostname === 'string')) {
        throw new TypeError("Value of argument \"hostname\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(hostname));
    }

    if (!(typeof basePath === 'string')) {
        throw new TypeError("Value of argument \"basePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(basePath));
    }

    if (!(typeof outputDirectory === 'string')) {
        throw new TypeError("Value of argument \"outputDirectory\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(outputDirectory));
    }

    if (!(typeof slug === 'string')) {
        throw new TypeError("Value of argument \"slug\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(slug));
    }

    if (!(typeof createAbsoluteURI === 'boolean')) {
        throw new TypeError("Value of argument \"createAbsoluteURI\" violates contract.\n\nExpected:\nboolean\n\nGot:\n" + _inspect(createAbsoluteURI));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    let err;
    let URI = "";

    // Ensure that if we need it, the scheme is valid (for a website - might we ever need file: etc.?)
    if (scheme === "http:" || scheme === "https:" || createAbsoluteURI === false) {
        if (hostname.length) {
            if (slug.length) {
                // First, calculate the path component for this content type so we can add it to the basePath below
                const parsedPath = _path2.default.parse(outputDirectory);
                const outputTLD = parsedPath.base;

                // Second, create just the hostname and path section of the URI, replacing any instances of >1 / with a single /
                const URN = `${ basePath }/${ outputTLD }/${ slug }.html`.replace(/\/{2,}/g, "/");

                if (createAbsoluteURI === true) {
                    // Now join the above to the scheme and we're done
                    const URIEnd = `${ hostname }/${ URN }`.replace(/\/{2,}/g, "/");

                    URI = `${ scheme }//${ URIEnd }`;
                } else {
                    URI = `${ URN }`;
                }
            } else {
                err = new TypeError("Argument 'slug' must be a non-empty string");
            }
        } else {
            err = new TypeError("Argument 'hostname' must be a non-empty string");
        }
    } else {
        err = new TypeError("Argument 'scheme' must be either 'http:' or 'https:'");
    }

    return callback(err, URI);
}

module.exports = createURI;

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
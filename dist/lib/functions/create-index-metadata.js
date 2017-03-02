"use strict";

var _createIndexFilename = require("./create-index-filename.js");

var _createIndexFilename2 = _interopRequireDefault(_createIndexFilename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createIndexMetadata(currentIndexNumber, totalNumberOfIndexes, pathPrefix, callback) {
    if (!(typeof currentIndexNumber === 'number')) {
        throw new TypeError("Value of argument \"currentIndexNumber\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(currentIndexNumber));
    }

    if (!(typeof totalNumberOfIndexes === 'number')) {
        throw new TypeError("Value of argument \"totalNumberOfIndexes\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(totalNumberOfIndexes));
    }

    if (!(typeof pathPrefix === 'string')) {
        throw new TypeError("Value of argument \"pathPrefix\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(pathPrefix));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Output Object scaffolding
    let indexMetadata = {
        isFirstIndex: false,
        isNotFirstIndex: false,
        prevIndexHRef: "",
        isLastIndex: false,
        isNotLastIndex: false,
        nextIndexHRef: ""

        // prob add: current index, total num indexes, array of indexes (to allow iterating over all)

    };

    if (currentIndexNumber === 0) {
        indexMetadata.isFirstIndex = true;
    }
    // Invert the above (or default value)
    indexMetadata.isNotFirstIndex = !indexMetadata.isFirstIndex;

    if (currentIndexNumber >= totalNumberOfIndexes - 1) {
        indexMetadata.isLastIndex = true;
    }
    // Invert the above (or default value)
    indexMetadata.isNotLastIndex = !indexMetadata.isLastIndex;

    const prevIndeXNumber = currentIndexNumber - 1;
    (0, _createIndexFilename2.default)(prevIndeXNumber, pathPrefix, prevIndexHref => {
        // For absolute clarity, we'll only set indexMetadata.prevIndexHRef if there is one - should prevent some front end errors
        if (indexMetadata.isFirstIndex === true) {
            indexMetadata.prevIndexHRef = "";
        } else {
            indexMetadata.prevIndexHRef = prevIndexHref;
        }

        const nextIndexNumber = currentIndexNumber + 1;
        (0, _createIndexFilename2.default)(nextIndexNumber, pathPrefix, nextIndexHref => {
            // For absolute clarity, we'll only set indexMetadata.nextIndexHRef if there is one - should prevent some front end errors
            if (indexMetadata.isLastIndex === true) {
                indexMetadata.nextIndexHRef = "";
            } else {
                indexMetadata.nextIndexHRef = nextIndexHref;
            }

            return callback(indexMetadata);
        });
    });
}

module.exports = createIndexMetadata;

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
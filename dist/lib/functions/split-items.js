"use strict";

function splitItems(items, chunkLength, callback) {
    if (!Array.isArray(items)) {
        throw new TypeError("Value of argument \"items\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(items));
    }

    if (!(typeof chunkLength === 'number')) {
        throw new TypeError("Value of argument \"chunkLength\" violates contract.\n\nExpected:\nnumber\n\nGot:\n" + _inspect(chunkLength));
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError("Value of argument \"callback\" violates contract.\n\nExpected:\nFunction\n\nGot:\n" + _inspect(callback));
    }

    // Handle incorrect args
    if (chunkLength < -1 || chunkLength === 0) // NOTE: This allows chunkLength === -1 which denotes no chunking
        {
            const e = new TypeError("Argument chunkLength must be either -1 (for no chunking or > 0)");
            return callback(e, []); // eslint-disable-line object-curly-newline
        }

    // The chunk number (or index, if you prefer)
    let chunk = 0;

    // Initialise the items Array which is what we'll return
    let itemsArray = [];

    // Iterate through the Objects keys...
    items.map((v, i) => {
        // ...and chunk up the items object into an array of items
        if (i % chunkLength === 0) {
            // If we're not on the 0th item and chunkLength != -1, increment the chunk counter
            if (i > 0 && chunkLength != -1) {
                chunk++;
            }

            // Bypass this (except for the initial case) if chunkLength === -1
            if (chunkLength >= 0 || chunkLength === -1 && i === 0) {
                // Initialise a new Object containing and "items" array...
                const IA = {
                    items: []
                };

                // ... to push onto the new itemsArray element
                itemsArray.push(IA);
            }
        }

        // Push the current items element onto the itemsArray
        itemsArray[chunk].items.push(v);
    });

    /* NOTE: Returned data is an Array with format:
    [
        {
            items: [...]
        },
        {
            items: [...]
        },
        {
            items: [...]
        },
        ...
    ]
    */

    // Return the itemsArray Array once we've finihed creating it
    return callback(undefined, itemsArray);
}

module.exports = splitItems;

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
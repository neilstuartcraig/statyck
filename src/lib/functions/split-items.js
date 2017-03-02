"use strict";

function splitItems(items: Array, chunkLength: number, callback: Function)
{
    // Handle incorrect args
    if(chunkLength < -1 || chunkLength === 0) // NOTE: This allows chunkLength === -1 which denotes no chunking
    {
        const e = new TypeError("Argument chunkLength must be either -1 (for no chunking or > 0)");
        return callback(e, []); // eslint-disable-line object-curly-newline
    }

    // The chunk number (or index, if you prefer)
    let chunk = 0;

    // Initialise the items Array which is what we'll return
    let itemsArray = [];

    // Iterate through the Objects keys...
    items.map((v, i) => 
    {
        // ...and chunk up the items object into an array of items
        if(i % chunkLength === 0)
        {
            // If we're not on the 0th item and chunkLength != -1, increment the chunk counter
            if(i > 0 && chunkLength != -1)
            {
                chunk++;
            }

            // Bypass this (except for the initial case) if chunkLength === -1
            if(chunkLength >= 0 || (chunkLength === -1 && i === 0))
            {
                // Initialise a new Object containing and "items" array...
                const IA = 
                {
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
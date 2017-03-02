"use strict";

import createIndexFilename from "./create-index-filename.js";

function createIndexMetadata(currentIndexNumber: number, totalNumberOfIndexes: number, pathPrefix: string, callback: Function)
{
    // Output Object scaffolding
    let indexMetadata = 
    {
        isFirstIndex: false,
        isNotFirstIndex: false,
        prevIndexHRef: "",
        isLastIndex: false,
        isNotLastIndex: false,
        nextIndexHRef: ""

// prob add: current index, total num indexes, array of indexes (to allow iterating over all)

    };

    if(currentIndexNumber === 0)
    {
        indexMetadata.isFirstIndex = true;
    }
    // Invert the above (or default value)
    indexMetadata.isNotFirstIndex = !indexMetadata.isFirstIndex;

    if(currentIndexNumber >= (totalNumberOfIndexes - 1))
    {
        indexMetadata.isLastIndex = true;
    }
    // Invert the above (or default value)
    indexMetadata.isNotLastIndex = !indexMetadata.isLastIndex;

    const prevIndeXNumber = currentIndexNumber - 1;
    createIndexFilename(prevIndeXNumber, pathPrefix, (prevIndexHref) => 
    {
        // For absolute clarity, we'll only set indexMetadata.prevIndexHRef if there is one - should prevent some front end errors
        if(indexMetadata.isFirstIndex === true)
        {
            indexMetadata.prevIndexHRef = "";    
        }
        else
        {
            indexMetadata.prevIndexHRef = prevIndexHref;
        }

        const nextIndexNumber = currentIndexNumber + 1;
        createIndexFilename(nextIndexNumber, pathPrefix, (nextIndexHref) => 
        {
            // For absolute clarity, we'll only set indexMetadata.nextIndexHRef if there is one - should prevent some front end errors
            if(indexMetadata.isLastIndex === true)
            {
                indexMetadata.nextIndexHRef = "";
            }
            else
            {
                indexMetadata.nextIndexHRef = nextIndexHref;
            }

            return callback(indexMetadata);
        });
    });
}

module.exports = createIndexMetadata;
"use strict";

// Deps - core
import path from "path";

// NOTE: This currently doesn't allow use of non-standard ports
function createURI(scheme: string, hostname: string, basePath: string, outputDirectory: string, slug: string, createAbsoluteURI: boolean, callback: Function)
{
    let err;
    let URI = "";

    // Ensure that if we need it, the scheme is valid (for a website - might we ever need file: etc.?)
    if(scheme === "http:" || scheme === "https:" || createAbsoluteURI === false)
    {
        if(hostname.length)
        {
            if(slug.length)
            {
                // First, calculate the path component for this content type so we can add it to the basePath below
                const parsedPath = path.parse(outputDirectory);       
                const outputTLD = parsedPath.base;
                
                // Second, create just the hostname and path section of the URI, replacing any instances of >1 / with a single /
                const URN = `${basePath}/${outputTLD}/${slug}.html`.replace(/\/{2,}/g, "/");

                if(createAbsoluteURI === true)
                {
                    // Now join the above to the scheme and we're done
                    const URIEnd = `${hostname}/${URN}`.replace(/\/{2,}/g, "/");

                    URI = `${scheme}//${URIEnd}`;
                }
                else
                {
                    URI = `${URN}`;
                }
            }
            else
            {
                err = new TypeError("Argument 'slug' must be a non-empty string");
            }
        }
        else
        {
            err = new TypeError("Argument 'hostname' must be a non-empty string");
        }
    }
    else
    {
        err = new TypeError("Argument 'scheme' must be either 'http:' or 'https:'");
    }

    return callback(err, URI);
}

module.exports = createURI;
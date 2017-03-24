# statyck changelog

## v1.4.7
* Fix: Add quickstart guide to readme

## v1.4.6
* Patch: Add note to `statyck local` to say "hit ctrl+c to stop local server"

## v1.4.5
* Fix: Optimise Travis CI build time

## v1.4.4
* Fix: Tidy local server (remove `console.log` and add comment)

## v1.4.3
* Fix: Incorrect path prefix in template configs

## v1.4.2
* Fix: Remove `statyck-config/` from remote

## v1.4.1
* Fix: Complete missing docs (readme) on local web server

## v1.4.0
* Feature: Very basic local HTTP server added. Run it via `statyck local`
* Fix: Add `statyck-config/` to `.gitignore` as it's an artifact of local testing/dev and not needed for users

## v1.3.0
* Minor tidy

## v1.2.2
* Patch: Add OSX builds to Travis

## v1.2.1
* Fix: Broken TravisCI build (probably due to adding engines directive to pkg.json)

## v1.2.0
* Feature: Add Statyck (app) config file to avoid hard-coded values in the app

## v1.1.1
* Fix: Poor name of `copyAssetFiles()`, renamed to `recCopyFiles()`

## v1.1.0
* Feature: Disambiguate userland config dir - renamed to `statyck-config/`
* Fix: Untidy working/testing directories - move to `output/`

## v1.0.9
* Fix: Correct `package.json` links

## v1.0.8
* Fix: Actually change the `travis.yml` file WRT 1.0.7

## v1.0.7
* Fix: Amend Travis config to remove old versions of Node (pre 6) & add info to readme

## v1.0.6
* Fix: Remove incorrectly configured Snyk config - Temporary measure!

## v1.0.5
* Fix: brittle (dependent on timestamp of files) tests for `listFiles()` and `createIndexes()`

## v1.0.4
* Fix: Remove incorrect ref to `yargs` in dev dependencies

## v1.0.3
* Fix: Readme file
* Fix: Fix Travis setup

## v1.0.2
* Fix: Move logic to get userland config (statyck & theme) to a fn

## v1.0.1
* Fix: incorrect/misleading fn name `createOutputDir` renamed to `createDirRec` to better reflect what it does
* Fix: Missing description in `package.json`

## v1.0.0
Initial version

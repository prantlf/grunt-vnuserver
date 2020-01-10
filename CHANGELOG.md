# [2.0.0](https://github.com/prantlf/grunt-vnuserver/compare/v1.2.0...v2.0.0) (2020-01-10)

### Bug Fixes

* Detect that the new vnu-jar server has started using log4j ([dffd7e8](https://github.com/prantlf/grunt-vnuserver/commit/dffd7e80fe4e61200baf8b8eb0692193ff6aa623))
* Upgrade package dependencies ([288c8fc](https://github.com/prantlf/grunt-vnuserver/commit/288c8fc402f8889c3cf51bca8744b587758fae2c))

### BREAKING CHANGES

* The minimum required Node.js version is the latest release of the 8 branch. Most dependencies require this now.

# [1.2.0](https://github.com/prantlf/grunt-vnuserver/compare/v1.1.3...v1.2.0) (2018-09-08)

### Features

* Remove the check for supported Java versions

The current one is Java 10 and OpenJDK changed versioning to 10.x. The version check has become troublesome to constantly update. It is better to document what Java version work or do not work with this package.

## [1.1.3](https://github.com/prantlf/grunt-vnuserver/compare/v1.1.2...v1.1.3) (2018-06-18)

### Bug Fixes

* Switch to vnu-jar@next, which is the renamed [@dev](https://github.com/dev) package ([f86f8e6](https://github.com/prantlf/grunt-vnuserver/commit/f86f8e6a143a387fa017a0899cff2c523db272c1))

## [1.1.2](https://github.com/prantlf/grunt-vnuserver/compare/v1.1.1...v1.1.2) (2018-06-18)

### Bug Fixes

* Switch to the versioned vnu-jar because the [@dev](https://github.com/dev) package was removed ([faf7502](https://github.com/prantlf/grunt-vnuserver/commit/faf75026b23f1c119d849cbcae1af46c11c290ca))

This is the first release of the [`grunt-vnuserver-dev` module](https://www.npmjs.com/package/grunt-vnuserver-dev) forked from the [original project](https://github.com/bennieswart/grunt-vnuserver).

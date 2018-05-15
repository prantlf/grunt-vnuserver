# grunt-vnuserver-dev

[![Code Climate](https://img.shields.io/codeclimate/github/prantlf/grunt-vnuserver-dev.svg)](https://codeclimate.com/github/prantlf/grunt-vnuserver-dev)
[![Dependency Status](https://img.shields.io/david/prantlf/grunt-vnuserver-dev.svg)](https://david-dm.org/prantlf/grunt-vnuserver-dev)
[![devDependency Status](https://img.shields.io/david/dev/prantlf/grunt-vnuserver-dev.svg)](https://david-dm.org/prantlf/grunt-vnuserver-dev#info=devDependencies)

[Grunt][grunt] plugin for starting the [vnu.jar markup checker][vnujar] in server mode.
Plays well with [grunt-html-dev][grunt-html-dev] for faster HTML validation by only starting vnu.jar once, as startup can take a few seconds.

This fork publishes a new `grunt-vnuserver-dev` NPM module, which depends on `vnu-jar@dev` instead of the latest release of `vnu-jar`. The [W3C Markup Validation Service](https://validator.w3.org/) uses the *development version* of `vnu-jar` too. If you want to get consistent results from on-line and off-line testing, you should use `grunt-vnuserver-dev` instead of `grunt-vnuserver` in your project.

## Getting Started

Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with:

```bash
npm install grunt-vnuserver-dev --save-dev
```

Then add this line to your project's `Gruntfile.js`:

```js
grunt.loadNpmTasks('grunt-vnuserver-dev');
```

## Options

### `port`

* Type: `Number`
* Default: 8888

The port on which to start the server.

```js
all: {
  options: {
      port: 8877
  },
}
```

### `skippable`

* Type: `Boolean`
* Default: `false`

Whether or not to skip server startup if port is already in use.
Task will fail if port is in use and `skippable` and `useAvailablePort` are false.

### `persist`

* Type: `Boolean`
* Default: `false`

Whether or not to keep the vnu server running even after grunt exists.
If false, vnu server is killed when grunt exists.

### `useAvailablePort`

* Type: `Boolean`
* Default: `false`

If `true` the task will look for the next available port, if the port
set by the `port` option is in use.

## Example

Consider the following configuration in Gruntfile.js in which the `watch` task is set to run `htmllint` every time the source file changes.
By starting the validator in server mode once using the `vnuserver` task, validations by `htmllint` can be performed much faster by simply connecting to this already-running server.

```js
module.exports = function (grunt) {
    grunt.initConfig({
        vnuserver: {
        },
        htmllint: {
            all: {
                options: {
                    // This option makes grunt-html-dev connect to the vnu server instance.
                    server: {}
                },
                src: "app.html"
            }
        },
        watch: {
            all: {
                tasks: ['htmllint'],
                files: "app.html"
            }
        },
    });

    grunt.loadNpmTasks('grunt-vnuserver-dev');
    grunt.loadNpmTasks('grunt-html-dev');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['vnuserver', 'watch']);
};
```

### Using the First Available Port

If you set `useAvailablePort` to `true`, you will need to pass the actual value to the `htmllint`
task, but the value will be known first during the runtime. Use a function for the `server`
option, which was introduced in the [grunt-html-dev] fork, at first.

```js
module.exports = function (grunt) {
    var vnuPort;

    grunt.initConfig({
        vnuserver: {
            // Name the task to be able to listen to its events.
            server: {
                // Start with the first free ephemeral port.
                port: 49152,
                // Try other ports, up to port + 30, if the first one is not free.
                useAvailablePort: true
            }
        },
        htmllint: {
            options: {
                // Connect to the vnu server on the dynamically chosen  port.
                server: function () {
                    return {
                        port: vnuPort
                    };
                }
            },
            all: {
                src: "app.html"
            }
        },
        watch: {
            all: {
                tasks: ['htmllint'],
                files: "app.html"
            }
        },
    });

    grunt.loadNpmTasks('grunt-vnuserver-dev');
    grunt.loadNpmTasks('grunt-html-dev');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Obtain the port, which the vnu server is listening to.
    grunt.event.on('vnuserver.server.listening', function (port) {
        vnuPort = port;
    });

    grunt.registerTask('default', ['vnuserver', 'watch']);
};
```

## License

Copyright Bennie Swart.
Licensed under the MIT license.

[grunt]: http://gruntjs.com/
[grunt-html-dev]: https://github.com/prantlf/grunt-html-dev
[getting_started]: http://gruntjs.com/getting-started
[vnujar]: https://validator.github.io/validator/

'use strict'

module.exports = function (grunt) {
    const coverage = process.env.GRUNT_VNUSERVER_COVERAGE;

    grunt.initConfig({
        eslint: {
            check: [
                'Gruntfile.js',
                'tasks/*.js'
            ]
        },

        instrument: {
            files: 'tasks/*.js',
            options: {
                lazy: true,
                basePath: 'coverage/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'coverage'
            }
        },

        makeReport: {
            src: 'coverage/coverage.json',
            options: {
                type: 'lcov',
                dir: 'coverage',
                print: 'detail'
            }
        },

        clean: {
            coverage: ['coverage/**']
        },

        vnuserver: {
            options: {
                port: 49152,
                useAvailablePort: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

    let vnuPort;

    grunt.event.on('vnuserver.listening', function (port) {
        vnuPort = port;
    });

    grunt.registerTask('vnucheck', function () {
        if (!vnuPort) {
            grunt.fail.warn('VNU Server has not started.');
        }
    });

    const test = ['eslint', 'clean', 'vnuserver', 'vnucheck'];
    const report = coverage ? ['storeCoverage', 'makeReport'] : [];
    grunt.registerTask('default', test.concat(report));
};

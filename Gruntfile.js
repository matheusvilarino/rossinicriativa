'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/**/*.js',
                '!assets/build/app.min.js'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: false,
                    sourcemap: false,
                    quietDeps: true
                },
                files: {
                    'generated/css/app.min.css': [
                        'assets/scss/main.scss'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'generated/js/app.min.js': [
                        'assets/js/default/*.js',
                        'assets/js/custom.js',
                        'assets/js/vc-custom.js'
                    ]
                },
                options: {
                    sourceMap: 'generated/js/app.min.js.map',
                    sourceMappingURL: 'generated/js/app.min.js.map'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: [
                    'assets/scss/**/*.scss'
                ],
                tasks: ['sass']
            },
            js: {
                files: [
                    'assets/js/**/*.js'
                ],
                tasks: ['uglify']
            },
            html: {
                files: [
                    '**/*.html'
                ]
            }
        },
        clean: {
            dist: [
                'generated/js/app.min.css',
                'generated/js/app.min.js'
            ]
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'sass',
        'uglify'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};

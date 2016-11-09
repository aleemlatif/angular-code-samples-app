'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'src',
        dist: 'dist'
    };

    var devServer = '127.0.0.1';

    //Test reporting directory
    grunt.file.mkdir('test-reports');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/app/**/*.js', '<%= yeoman.app %>/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['<%= yeoman.app %>/test/spec/*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= yeoman.app %>/assets/styles/sass/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/app/**/{,*/}*.html', '<%= yeoman.app %>/index.html',
                    '<%= yeoman.app %>/assets/styles/css/{,*/}*.css',
                    '.tmp/styles/css/{,*/}*.css',
                    '<%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9010,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: devServer,
                livereload: 35739
            },
            server: {

                proxies: [

                    {
                        context: '/security-service',
                        host: devServer,
                        headers: {
                            'host': devServer
                        }
                    },
                    {
                        context: '/AL-app',
                        host: devServer,
                        port: 9010,
                        rewrite: {
                            '^/AL-app': ''
                        }
                    },
                    {
                        context: '/web-service',
                        host: devServer,
                        changeOrigin: false,
                        https: false,
                        headers: {
                            'host': devServer
                        }
                    }
                ]
            },

            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9002,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('/src/test'),
                            connect().use(
                                '/src/vendor',
                                connect.static('./src/vendor')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/app/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yeoman.app %>/test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/css/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            },
            sass: {
                src: ['<%= yeoman.app %>/assets/styles/sass/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}vendor\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/assets/styles/sass',
                cssDir: '<%= yeoman.app %>/assets/styles/css',
                generatedImagesDir: '<%= yeoman.app %>/assets/images/generated',
                imagesDir: '<%= yeoman.app %>/assets/images',
                javascriptsDir: '<%= yeoman.app %>',
                fontsDir: '<%= yeoman.app %>/assets/styles/fonts',
                importPath: '<%= yeoman.app %>/vendor',
                httpImagesPath: '<%= yeoman.app %>/assets/images',
                httpGeneratedImagesPath: '<%= yeoman.app %>/assets/images/generated',
                httpFontsPath: '<%= yeoman.app %>/assets/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated'
                }
            },
            server: {
                options: {
                    sourcemap: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/{,*/}*.js',
                    '<%= yeoman.dist %>/assets/styles/css/{,*/}*.css',
                    // '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    // '<%= yeoman.dist %>/assets/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglify'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/assets/styles/css/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/assets/images',
                    '<%= yeoman.dist %>/assets/styles/css',
                    '<%= yeoman.dist %>/assets/fonts',
                    '<%= yeoman.dist %>/scripts'
                ]
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
         cssmin: {
           dist: {
             files: {
               '<%= yeoman.dist %>/assets/styles/app-styles.css': [
                 '.tmp/assets/styles/{,*/}*.css'
               ]
             }
           }
        },
        uglify: {
           dist: {
             files: {
               '<%= yeoman.dist %>/scripts/scripts.js': [
                 '<%= yeoman.dist %>/scripts/scripts.js'
               ]
             }
           }
         },
         concat: {
           dist: {}
         },

         imagemin: {
           dist: {
             files: [{
               expand: true,
               cwd: '<%= yeoman.app %>/assets/images',
               src: '{,}*.{png,jpg,jpeg,gif}',
               dest: '<%= yeoman.dist %>/assets/images'
             }]
           }
         },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'app/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'app/**/{,*/}*.html',
                        'assets/images/{,*/}*.*',
                        'assets/styles/fonts/{,*/}*.*',
                        'assets/js/**/*.js',
                        'assets/documents/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/assets/images',
                    dest: '<%= yeoman.dist %>/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'src/vendor/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>/assets/styles'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'src/vendor/font-awesome',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>/assets/styles'
                }, {
                    expand: true,
                    cwd: 'src/vendor/tinymce-dist',
                    src: 'plugins/**/*.*',
                    dest: '<%= yeoman.dist %>/scripts'
                }, {
                    expand: true,
                    cwd: 'src/vendor/tinymce-dist',
                    src: 'skins/**/*.*',
                    dest: '<%= yeoman.dist %>/scripts'
                }, {
                    expand: true,
                    cwd: 'src/vendor/tinymce-dist',
                    src: 'themes/**/*.*',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/assets/styles/css',
                dest: '.tmp/assets/styles/css',
                src: '{,*/}*.css'
            },
            genStyles: {
                expand: true,
                cwd: '.tmp/assets/styles/',
                dest: '<%= yeoman.app %>/assets/styles',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                // 'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: '<%= yeoman.app %>/test/karma.conf.js',
                singleRun: true
            }
        },


        release: {
            options: {
                npm: false
            }
        },

        // https://github.com/mdasberg/grunt-karma-sonar
        karmaSonar: {
            options: {},
            webclient: {
                project: {
                    key: 'AL-app:1.0.0',
                    name: 'AL-app',
                    version: '1.0.0'
                },
                sources: [{
                    path: 'src/app',
                    prefix: '',
                    coverageReport: 'coverage/report/lcov.info',
                    testReport: 'test-reports/report/TESTS-xunit.xml'
                }],
                exclusions: []
            }
        }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'configureProxies:server',
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'copy:styles',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    // Additional Tasks
    //
    grunt.registerTask('sonar', ['test', 'karmaSonar']);

    grunt.registerTask('styles', [
        'compass:server',
        'autoprefixer',
        'copy:genStyles'
    ]);

};

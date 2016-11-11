// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-10 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'vendor/modernizr/modernizr.js',
      'vendor/es5-shim/es5-shim.js',
      'vendor/jquery/dist/jquery.js',
      'vendor/bootstrap/dist/js/bootstrap.js',
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'vendor/jquery-ui/jquery-ui.js',
      'vendor/underscore/underscore.js',
      'vendor/angular-aria/angular-aria.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-breadcrumb/release/angular-breadcrumb.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-messages/angular-messages.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/angular-touch/angular-touch.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-hateoas/src/angular-hateoas.js',
      'vendor/angular-ui-utils/ui-utils.js',
      'vendor/json3/lib/json3.js',
      'vendor/ngstorage/ngStorage.js',
      'vendor/ng-idle/angular-idle.js',
      'vendor/leaflet/dist/leaflet-src.js',
      'vendor/angular-mocks/angular-mocks.js',
      // endbower
      '*.js',
      'app/**/*.js',
      'test/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'vendor/angular-scenario/angular-scenario.js'
    ],

    // web server port
    port: 9999,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
     //  'Chrome'
       'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
   //   'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/app/*.js': ['coverage'],
      'src/app/**/*.js': ['coverage']
    },

    reporters: ['progress', 'junit', 'coverage'],

    junitReporter: {
      outputFile: '../../test-reports/junit/TESTS-xunit.xml',
      suite: ''
    },

    coverageReporter: {
      reporters: [
        {type: 'lcov', file: 'lcov.info'}
      ],
      dir: '../test-reports',
      subdir: 'coverage'
    }

  });
};

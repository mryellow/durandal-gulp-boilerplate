var paths = require('./build/paths');

// Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    baseUrl: '/base/' + paths.input + paths.root,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    // TODO: Use requirejs.config
    files: [
        'test/unit/test-main.js',
        {pattern: paths.input + paths.root + '**/*.js', included: false},
        {pattern: paths.input + paths.vendor + '**/*.js', included: false},
        {pattern: 'test/unit/dev/**/*.spec.js', included: false}
    ],


    // list of files to exclude
    exclude: [
        paths.input + paths.root + 'main.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['progress', 'junit'],
    reporters: ['progress'],
    /*
    junitReporter: {
        outputDir: 'test/unit/output', // results will be saved as $outputDir/$browserName.xml
        outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '' // suite will become the package name attribute in xml testsuite element
    },
    */

    proxyValidateSSL: false,
    // ['websocket', 'flashsocket', 'xhr-polling', 'jsonp-polling']
    transports: ['xhr-polling'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox'],
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

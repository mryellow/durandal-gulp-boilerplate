var paths = require('./build/paths');

// e2e test configuration file.
exports.config = {
    // SauceLabs
    //sauceUser: process.env.SAUCE_USERNAME,
    //sauceKey:  process.env.SAUCE_ACCESS_KEY,

    // Standalone
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://localhost:9001',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',

        // Saucelabs meta-data.
        //'tunnel-identifier': process.env.CIRCLE_BRANCH+'_'+process.env.CIRCLE_SHA1,
        'build': process.env.CIRCLE_BUILD_NUM,
        'name': process.env.CIRCLE_BRANCH
    },

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        /*
        // TODO: This is Aurelia `value.bind` handler. Implement similar for KnockoutJS.

        by.addLocator('valueBind', function (bindingModel, opt_parentElement) {
        var using = opt_parentElement || document;
        var matches = using.querySelectorAll('*[value\\.bind="' + bindingModel +'"]');
        var result;

        if (matches.length === 0) {
        result = null;
        } else if (matches.length === 1) {
        result = matches[0];
        } else {
        result = matches;
        }

        return result;
        });
        */
    },

    // Alternative Selenium approaches.
    //seleniumAddress: 'http://0.0.0.0:4444',
    //seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',

    specs: [paths.e2eSpecsDist + '*.spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 60000
    }
};

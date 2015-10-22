/**
 * Configuration options for tests
 */
//if (!process.env.TEST_FOO) throw new Error('Test foo must be configured in ENV.');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

module.exports = {
    spinner: by.css('.spinner'),
    //user: process.env.TEST_FOO,
    timeout: 60000
};

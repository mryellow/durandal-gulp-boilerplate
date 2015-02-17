var tests = [];
for (var file in window.__karma__.files) {
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
	// Karma serves files from '/base'
    baseUrl: '/base/app',
    // ask Require.js to load these files (all our tests)
    deps: tests,
    // start test run, once Require.js is done
    callback: window.__karma__.start,
    paths: {
        'text':                     '../lib/requirejs-text/text',
        'durandal':                 '../lib/durandal/js',
        'plugins':                  '../lib/durandal/js/plugins',
        'transitions':              '../lib/durandal/js/transitions',
        'knockout':                 '../lib/knockout.js/knockout',
        'jquery':	                '../lib/jquery/jquery.min'
    },
    shim: {
    }
});

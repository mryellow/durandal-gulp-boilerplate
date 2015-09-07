var tests = [];
for (var file in window.__karma__.files) {
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
	// Karma serves files from '/base'
    baseUrl: '/base/src/app',
    // ask Require.js to load these files (all our tests)
    deps: tests,
    // start test run, once Require.js is done
    callback: window.__karma__.start,
    paths: {
        'text':                     '../vendor/requirejs-text/text',
        'durandal':                 '../vendor/durandal/js',
        'plugins':                  '../vendor/durandal/js/plugins',
        'transitions':              '../vendor/durandal/js/transitions',
        'knockout':                 '../vendor/knockout/dist/knockout',
        'jquery':	                '../vendor/jquery/jquery.min'
        //'bootstrap':                '../vendor/bootstrap-sass/assets/javascripts/bootstrap'
    },
    shim: {
        'jquery': {
            exports: ['$','jQuery']
        }
    }
});

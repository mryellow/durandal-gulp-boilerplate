requirejs.config({
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

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/router'],  function (system, app, viewLocator, router) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Boilerplate';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
        
    });
});
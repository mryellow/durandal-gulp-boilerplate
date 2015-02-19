requirejs.config({
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
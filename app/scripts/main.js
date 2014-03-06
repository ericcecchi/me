require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jqueryEasing: '../bower_components/jquery-easing/jquery.easing.min',
        bootstrap: 'vendor/bootstrap',
        stellar: '../bower_components/jquery.stellar/jquery.stellar.min',
        autosize: '../bower_components/jquery-autosize/jquery.autosize.min',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jqueryEasing: {
            deps: ['jquery']
        },
        stellar: {
            deps: ['jquery']
        },
        autosize: {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'bootstrap','jqueryEasing','stellar','autosize'], function (app, $) {
    'use strict';
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
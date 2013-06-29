require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jqueryEasing: '../bower_components/jquery-easing/jquery.easing.min',
        bootstrap: 'vendor/bootstrap',
        html2canvas: 'vendor/html2canvas.min',
        blur: 'vendor/blur.min',
        stellar: '../bower_components/jquery.stellar/jquery.stellar.min',
        autosize: '../bower_components/jquery-autosize/jquery.autosize-min',
        iscroll: 'vendor/iscroll'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jqueryEasing: {
            deps: ['jquery']
        },
        blur: {
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

require(['app', 'jquery', 'bootstrap','jqueryEasing','stellar','html2canvas','blur','autosize','iscroll'], function (app, $) {
    'use strict';
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
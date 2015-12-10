/*jslint node: true */
/*global requirejs, define, window, document */
"use strict";

requirejs.config({
    'baseUrl': '/assets',
    'paths': {
        'application': 'js/application',
        // define vendor paths
        'jquery': 'js/jquery.min',
        'underscore': 'js/underscore.min',
        'backbone': 'js/backbone.min',
        'backfire': 'js/backfire.min',
        'bootstrap': 'js/bootstrap.min',
        'handlebars': 'js/handlebars.min',
        'path': 'js/path.min',
        'firebase': 'js/firebase.min',
    },
    'shim': {
        'jquery': {
            'exports': 'jQuery'
        },
        'underscore': {
            'exports': '_'
        },
        "bootstrap" : {
            "deps" : ['jquery']
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'backfire': {
            'deps': ['backbone', 'firebase', 'underscore']
        },
        'handlebars': {
            'exports': 'Handlebars'
        },
        'firebase': {
            'exports': 'Firebase'
        },
        'path': {
            'exports': 'Path'
        }
    }
});

requirejs(['application']);

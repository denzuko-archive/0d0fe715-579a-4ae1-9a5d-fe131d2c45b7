/*jslint node: true */
/*global requirejs, define */
"use strict";

requirejs.config({
    'baseUrl': '/assets',
    'paths': {
        'app': 'js',
        // define vendor paths
        'jquery': 'js/jquery.min',
        'underscore': 'js/underscore.min',
        'backbone': 'js/backbone.min',
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


/*jslint nomen: true*/
define([
    'jquery',
    'bootstrap',
    'underscore',
    'handlebars',
    'backbone',
    'path',
    'firebase'
], function ($, _, Backbone, Handlebars, Firebase, Path) {
    $(function () {
        /*jslint nomen: false*/
        this.app = this.app || {};

        (function (app) {
                app.appData=[];

                app.whenDataLoaded = $.Deferred();
                app.database = new Firebase("https://shining-heat-1586.firebaseio.com/");
                app.makeBlock = function (currentDay) {
                    $("<div/>").text(currentDay).addClass("block").appendTo("#application");
                };

                app.saveDate = function (newDate) {
                    app.whenDataLoaded.done(function () {
                        if (app.appData) {
                            app.appData.push(newDate);
                        } else {
                            app.appData = [newDate];
                        }
                    });
                    app.database.set(app.appData);
                };
        } (this.app));

        this.app.makeBlock();
        this.app.database.on('value', function (snapshot) {
            $('.block').remove();
            /*jslint nomen: true*/
            if (snapshot && (_.isEmpty(snapshot.val()) !== true) && _.isObject(snapshot.val())) {
                this.app.appData = _.uniq(snapshot.val());
            /*jslint nomen: false*/

                this.app.appData.forEach(function (item, value) {
                    this.app.makeBlock(item);
                });

            } else {
                this.app.appData = [];
            }

            this.app.whenDataLoaded.resolve();
        });

        /*jslint nomen: true*/
        _.each(["09/15/2014", "09/16/2014", "09/17/2014"], function (date) {
            /*jslint nomen: false*/
            this.app.saveDate(date);
        });
    });
});

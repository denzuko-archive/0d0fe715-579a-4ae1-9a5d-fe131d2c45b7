/*jslint node: true */
/*global requirejs, define, window, document */
"use strict";

/*jslint nomen: true*/
define([
    'jquery',
    'bootstrap',
    'underscore',
    'handlebars',
    'backbone',
    'backfire',
    'path',
    'firebase'
], function ($, _, Backbone, Firebase, Handlebars, Path) {
        /*jslint nomen: false*/

        this.Models = {
          Score: Backbone.Model.extend({
          }),
          Scores: Backbone.Collection.extend({
              defaults: function() {
                  return {
                      hashId: '',
                      value: 0.0
                  };
              }
          })
        };
        this.Views = {
            ScoreView: Backbone.View.extend({
                render: function() {
                    var source = $('#ScoreView').html(),
                        template = Handlebars.compile(source),
                        html = template(this.collection.toJSON());

                        this.$el.html(html);
                }, initialize: function() {
                    this.collection.on('add', this.render, this);
                }
            }),
            ScoresView: Backbone.View.extend({
                render: function() {
                    var source = $('#ScoresView').html(),
                        template = Handlebars.compile(source),
                        html = template(this.collection.toJSON());

                        this.$el.html(html);
                }, initialize: function() {
                    this.collection.on('add', this.render, this);
                }
            })
        };

        this.app = this.app || {};

        (function(app, Models) {

        var database = new Backbone.Firebase.Collection.extend({
              model: Models.Score,
              firebase: new Firebase("https://shining-heat-1586.firebaseio.com/")
        });

        app.whenDataLoaded = $.Deferred();
        app.database = new database();
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

        /*jslint nomen: true*/
        _.each([
            {hashId: '6afda57d157e3c0b444da561da44e44dd3cc4d52',value: 0.5},
            {hashId: '6afda57d157e3c0b444da561da44e44dd3cc4d52',value: 0.9},
            {hashId: '6afda57d157e3c0b444da561da44e44dd3cc4d52',value: 0.3}
        ], function (score) {
            app.saveScore(score);
        });
        /*jslint nomen: false*/

      $(document).ready(function () {
          app.makeBlock();
           
          // Set el of the views.
          this.Model.ScoreView.el = $('#scoreContainer');
          this.Model.ScoresView.el = $('#scoresContainer');

          app.database.on('value', function (snapshot) {
              $('.block').remove();
              /*jslint nomen: true*/
              if (snapshot && (_.isEmpty(snapshot.val()) !== true) && _.isObject(snapshot.val())) {
                  app.appData = _.uniq(snapshot.val());
              /*jslint nomen: false*/

                  app.appData.forEach(function (item, value) {
                      app.makeBlock(item);
                  });

              } else {
                  app.appData = [];
              }

              app.whenDataLoaded.resolve();
          });

          this.Model.ScoreView.render();

        Path.map("#/dashboard").to(function(){
          this.Model.ScoreView.render();
        });

      });

    }(this.app, this.Models));
});

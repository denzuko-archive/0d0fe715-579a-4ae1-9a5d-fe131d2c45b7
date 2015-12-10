/* jslint node: true */
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    grunt.initConfig({
        pkg: '<json:package.json>',
        less: {
            production: {
                options: {
                    yuicompress: true,
                    paths: ["bower_components/bootstrap/less", "bower_components/fontawesome/less"]
                },
                files: {
                    "assets/css/site.css": "assets/_less/site.less"
                }
            }
        },
        uglify: {
            backbone:   {files: {'assets/js/backbone.min.js':   ['bower_components/backbone/backbone.js']}},
            firebase:   {files: {'assets/js/firebase.min.js':   ['bower_components/firebase/firebase.js']}},
            handlebars: {files: {'assets/js/handlebars.min.js': ['bower_components/handlebars/handlebars.amd.js']}},
            pathjs:     {files: {'assets/js/path.min.js':       ['bower_components/pathjs/path.js']}},
            underscore: {files: {'assets/js/underscore.min.js': ['bower_components/underscore/underscore.js']}},
            bootstrap:  {files: {'assets/js/bootstrap.min.js': [
                'bower_components/bootstrap/js/collapse.js',
                'bower_components/bootstrap/js/scrollspy.js',
                'bower_components/bootstrap/js/button.js',
                'bower_components/bootstrap/js/ap-affix.js']}},
            jquery: {files: {'assets/js/jquery.min.js': ['bower_components/jquery/jquery.js']}}
        },
        copy: {
            fontawesome: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/fontawesome/fonts/',
                    src: ['**'],
                    dest: 'assets/fonts/'
                }, {
                    expand: true,
                    cwd: 'bower_components/fontawesome/css/',
                    src: ['font-awesome.min.css'],
                    dest: 'assets/css/'
                }]
            },
            requirejs: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/requirejs',
                    src: ['require.js'],
                    dest: 'assets/js/'
                }]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**'],
                    dest: 'assets/fonts/'
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/css/',
                    src: ['bootstrap.min.css'],
                    dest: 'assets/css/'
                }]
            }
        },
        jekyll: {
            dist: {
                options: {
                    config: "_config.yml"
                }
            }
        },
        exec: {
            serve: {
                cmd: 'jekyll serve --watch'
            },
            deploy: {
                cmd: 'git push origin gh-pages'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.registerTask('default', ['less', 'uglify', 'copy', 'jekyll']);
    grunt.registerTask('deploy', ['default', 'exec:deploy']);
};

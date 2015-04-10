/**
 * Created by Megha on 4/7/15.
 */
module.exports = function(grunt){
  'use strict';
  //to load all the grunt tasks from package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    //reading the project settings from package.json file into the pkg property
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: 'app',
      js: ['<%= project.app %>/scripts/{,*/}*.js'],
      css: ['<%= project.app %>/styles/{,*/}*.scss']
    },

    /**
     * Connect server
     */
    connect:{
      options:{
        protocol: 'http',
        port: 8080,
        hostname:'*',
        base: '<%= project.app %>',
        middleware: function(connect, options, middlewares){
          var livereloadScript = require('connect-livereload')({port: 35730});
          middlewares.push(connect.static('<%= project.app %>'));
          middlewares.push(livereloadScript);
          return middlewares;
        }
      }
    },
    /**
     * watch file changes
     */
    watch:{
      files:[
        '<%= project.js %>',
        'app/index.html',
        '<%= project.css %>',
        'app/styles/**/*.css',
        'app/views/**/*.html',
        'lib/api/*.js',
        'server.js'
      ],
      tasks: ['build:development'],
      options: {
        livereload: true,
        spawn: false
      }
    },
    /**
     * JShint warnings
     */
    jshint:{
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      files: {
        src: [
          '<%= project.js %>',
          'lib/api/*.js',
          'server.js',
          'Gruntfile.js'
        ]
      }
    },
    /**
     * Express server
     */
    express: {
      all: {
        options: {
          port: 8080,
          script: 'server.js'
        }
      }
    },
    /**
     * Open browser url
     */
    open: {
      server: {
        url: 'http://localhost:<%= express.all.options.port %>'
      }
    },
    /**
     * Sass for compiling sass to css file
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          '<%= project.app %>/styles/master.css': '<%= project.app %>/styles/master.scss'
        }
      }
    }
  });


  //Register our own custom task alias
  grunt.registerTask('default', [
    'jshint',
    'sass:dev',
    'watch']);

  grunt.registerTask('build', function(environment){
    var env = environment || 'development';
    grunt.task.run([
      'jshint',
      'loadConfig:' + env,
      'sass:dev'
    ]);
  });

  grunt.registerTask('server', function(){
    grunt.task.run([
      'build:development',
      'express',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('loadConfig', function(target){
    var environment = target || 'development';

    var config = grunt.file.readJSON('config/' + environment + '.json');
    config.environment = environment;
    grunt.config('buildProperties', config);
  });
};
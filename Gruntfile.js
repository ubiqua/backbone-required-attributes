module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src: ['backbone-required-attributes.js'],
      options: {
        browser: true,
        indent: 2,
        white: false,
        evil: true,
        regexdash: true,
        wsh: true,
        trailing: true,
        eqnull: true,
        expr: true,
        boss: true,
        node: true,
        strict: false
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner:
          '//\n' +
          '// <%= pkg.name %> - v<%= pkg.version %>\n' +
          '// The MIT License\n' +
          '// Copyright (c) 2015 Ubiqua, Diego Castillo <diegocasmo@gmail.com> \n' +
          '//\n'
      },
      dist: {
        src: 'backbone-required-attributes.js',
        dest: 'dist/backbone-required-attributes.js'
      }
    },

    uglify: {
      options: {
        banner:
          '//\n' +
          '// <%= pkg.name %> - v<%= pkg.version %>\n' +
          '// The MIT License\n' +
          '// Copyright (c) 2015 Ubiqua, Diego Castillo <diegocasmo@gmail.com> \n' +
          '//\n'
      },
      dist: {
        options: {
          preserveComments: false
        },
        files: {
          'dist/backbone-required-attributes.min.js': ['backbone-required-attributes.js']
        }
      }
    },

    clean: {
      build: ['dist']
    },

    jasmine : {
      src : 'backbone-required-attributes.js',
      options : {
        keepRunner: true,
        specs : 'specs/**/*.js',
        vendor: [
          'bower_components/jquery/jquery.js',
          'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js'
        ]
      }
    },

    watch: {
      files: [
        'backbone-required-attributes.js',
        'specs/**/*.js'
      ],
      tasks: ['jasmine']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', [
    'jshint',
    'jasmine',
    'clean:build',
    'uglify:dist',
    'concat'
  ]);

  grunt.registerTask('test', [
    'jasmine',
    'watch'
  ]);

};

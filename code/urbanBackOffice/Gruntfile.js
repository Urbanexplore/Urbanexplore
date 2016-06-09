// Generated on 2014-10-03 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
	//TODO : see why he don't do his job and we need to load the ones after.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  var serveStatic = require('serve-static');

  grunt.loadNpmTasks('grunt-karma');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    phonegap: 'www'
  }


  var path = require('path');
  var cordova_cmd = function(cmd) {
     var target = grunt.option('target') || "ios";
     return path.join(
      __dirname, "platforms",
      target, "cordova", cmd);
     };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              serveStatic('test'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    //js constant configuration options
    ngconstant: {
    	  // Options for all targets
    	  options: {
    	    space: '  ',
    	    wrap: '"use strict";\n //warning !!! : do not modify this file directly (auto-generated file), change configuration in Gruntfile.js in ngconstant bloc \n\n {%= __ngModule %}',
    	    name: 'config',
    	  },
    	  // Environment targets
    	  development: {
    	    options: {
    	      dest: '<%= yeoman.app %>/scripts/config.js'
    	    },
    	    constants: { //TODO : remove the use of url & port parameters, and use .address property only
    	    	confUri:{
    	    		baseUrl : 'http://tofix.uri/',
    	    		urbanNS : 'http://ooffee.eu/ns/urban#'
    	    	},
    	      urlStanbol: {
    	    	  url: 'http://127.0.0.1',
    	          port: '8080',
    	          address : 'http://127.0.0.1:8080',
    	          pwd :'Basic YWRtaW46YWRtaW4='
    	      },
    	      rdfuiConfig : {
    	          server: 'http://127.0.0.1:8080/'
    	      }
    	    }
    	  },
    	  production: {
    	    options: {
    	      dest: '<%= yeoman.app %>/scripts/config.js'
    	    },
    	    constants: { //TODO : remove the use of url & port parameters, and use .address property only
    	    	confUri:{
    	    		baseUrl : 'http://tofix.uri/',
    	    		urbanNS : 'http://ooffee.eu/ns/urban#'
    	    	},
    	    	urlStanbol: {
      	    	  url: 'http://ajax.urbanexplore.fr',
      	          port: '22',
      	          address : 'http://ajax.urbanexplore.fr',
      	          pwd :'Basic YWRtaW46YWRtaW4='
      	      	},
      	      	rdfuiConfig : {
      	      		server: 'http://ajax.urbanexplore.fr/'
      	      	}
    	    }
    	  }
    	},

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js'],
        ignorePath:  /\.\.\//
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },



    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, { //for font-awesome
            expand: true,
            cwd: 'bower_components/font-awesome/',
            src: 'fonts/*',
            dest: '<%= yeoman.dist %>'
          }, { //special case for tinymce as it's not fully managed by grunt in this version
              expand: true,
              cwd: '.',
            src: [
              'bower_components/tinymce/*',
              'bower_components/tinymce/langs/*',
              'bower_components/tinymce/plugins/*',
              'bower_components/tinymce/plugins/anchor/*',
              'bower_components/tinymce/plugins/autoresize/*',
              'bower_components/tinymce/plugins/autosave/*',
              'bower_components/tinymce/plugins/bbcode/*',
              'bower_components/tinymce/plugins/charmap/*',
              'bower_components/tinymce/plugins/code/*',
              'bower_components/tinymce/plugins/contextmenu/*',
              'bower_components/tinymce/plugins/directionality/*',
              'bower_components/tinymce/plugins/emoticons/*',
              'bower_components/tinymce/plugins/example/*',
              'bower_components/tinymce/plugins/example_dependency*',
              'bower_components/tinymce/plugins/fullpage/*',
              'bower_components/tinymce/plugins/fullscreen/*',
              'bower_components/tinymce/plugins/hr/*',
              'bower_components/tinymce/plugins/image/*',
              'bower_components/tinymce/plugins/importcss/*',
              'bower_components/tinymce/plugins/insertdatetime/*',
              'bower_components/tinymce/plugins/layer/*',
              'bower_components/tinymce/plugins/legacyoutput/*',
              'bower_components/tinymce/plugins/link/*',
              'bower_components/tinymce/plugins/lists/*',
              'bower_components/tinymce/plugins/media/*',
              'bower_components/tinymce/plugins/nonbreaking/*',
              'bower_components/tinymce/plugins/noneditable/*',
              'bower_components/tinymce/plugins/pagebreak/*',
              'bower_components/tinymce/plugins/paste/*',
              'bower_components/tinymce/plugins/preview/*',
              'bower_components/tinymce/plugins/print/*',
              'bower_components/tinymce/plugins/save/*',
              'bower_components/tinymce/plugins/searchreplace/*',
              'bower_components/tinymce/plugins/spellchecker/*',
              'bower_components/tinymce/plugins/tabfocus/*',
              'bower_components/tinymce/plugins/table/*',
              'bower_components/tinymce/plugins/template/*',
              'bower_components/tinymce/plugins/textcolor/*',
              'bower_components/tinymce/plugins/visualblocks/*',
              'bower_components/tinymce/plugins/visualchars/*',
              'bower_components/tinymce/plugins/wordcount/*',
              'bower_components/tinymce/plugins/autolink/*',
              'bower_components/tinymce/plugins/advlist/*',
              'bower_components/tinymce/themes/*',
              'bower_components/tinymce/skins/*',
              'bower_components/tinymce/skins/lightgray/*',
              'bower_components/tinymce/skins/lightgray/fonts/*',
              'bower_components/tinymce/skins/lightgray/img/*',
              'bower_components/tinymce/themes/modern/*'],
              dest: '<%= yeoman.dist %>'
            }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        //'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        autoWatch: true,
        singleRun: true
      }
    },

    shell: {
        build: {
            command: 'cordova build && ' + cordova_cmd('emulate')
        },
        run: {
            command: 'cordova build &&' + cordova_cmd("run")
        },
        publish: {
        	command: 'scp -r -P 1150 dist/* florent@sd-46461.dedibox.fr:/home/florent/urban/prod-backoffice/'
        }
    }


  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    //TODO : restore this jshint directive to clean all the code
    //'newer:jshint:all',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('emulate', [
    'shell:build']);

  grunt.registerTask('runEmul', [
   'shell:run'
  ]);

  grunt.registerTask('publish', [
                                 'build','shell:publish'
                                ]);
};

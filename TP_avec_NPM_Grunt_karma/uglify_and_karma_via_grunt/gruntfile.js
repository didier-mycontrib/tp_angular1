// grunt configuration

module.exports = function(grunt) {

  // Configuration de Grunt
  grunt.initConfig({
	  
	    //NB: npm update (after change dependencies in package.json)
	    pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			// Deletes all old .js files, but skips old min.js files
			js: ["path/to/dir/old/*.js", "!path/to/dir/old/*.min.js"] ,

			// delete all files and directories here
			build: ["build/xx/yy", "dist" , "dest"],
		} ,
		
		jshint: {
			all: ['gruntfile.js', 'js/**/*.js', 'test/**/*.js']
			// options in .jshintrc file
			},

	  
	    uglify: {
			my_target: {
			  files: [
				{ src: 'js/*js', dest: 'dest/common.js'}, 
                { src: 'test/unit/*js', dest: 'dest/test.js'}    
			]
			}
        } ,
 
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
  });
  
  // A very basic logging task.
  grunt.registerTask('basic_log', '', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
  

  // Definition des taches Grunt
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  
  
  grunt.registerTask('default', [ 'basic_log' , 'clean' , 'jshint' ,'uglify', 'karma']);

};


// old config:
/*
  uglify: {
			my_target: {
			  files: {
				'dest/minified.js': ['js/Convertisseur.js']
			  }
			}
        } ,
*/
module.exports = function(grunt){
	var $jsFiles = 'js/**/*.js'; 
	var $vendorJS = 'vendors/**/*.js';
	var $SassFiles = 'scss/**/*.scss';

	// Configure tasks here
	grunt.initConfig({
 
		jshint: {
			files: [$vendorJS, $jsFiles]
		},

		concat: {
			dist: {
				src: [$vendorJS, $jsFiles],
				dest: '../assets/js/main.js'
			}
		},

		uglify: {
			my_target: {
			  files: {
			    '../assets/js/main.min.js': '../assets/js/main.js'
			  }
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
					loadPath: require('node-bourbon').includePaths
				},
				files: {
					'../assets/css/main.css': 'scss/main.scss' 
				}
			}
		},

		watch: {
			grunt: { 
				files: ["gruntfile.js"], 
				tasks: ["default"] 
			},

			script: {
				files: [$vendorJS, $jsFiles],
				tasks: ['default']
			},

			sass: {
				files: $SassFiles,
				tasks: ["default"]
			}
		}
	});

	// Load tasks here
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Register tasks here
	grunt.registerTask('default', ['jshint','concat', 'uglify', 'sass']);
	
}
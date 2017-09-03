module.exports = function(grunt){
	grunt.initConfig({
		sass: {
			build: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					'build/files/css/main.min.css':'src/scss/main.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'build/files/css/main.min.css':'src/scss/main.scss'
				}
			}
		},
		concat: {
			options: {
				separator: '\n'
			},
			vendor: {
				src: [
			        'src/js/vendor/modernizr.min.js',
			        'src/js/vendor/jquery-3.2.1.min.js'
			    	],
			    dest: 'build/files/js/vendor.min.js'
			},
			project: {
				src: ['src/js/project/utils.js','src/js/project/*.js'],
				dest: 'build/files/js/main.min.js'
			}
		},
		watch: {
			css: {
				files: ['src/scss/modules/*.scss',
						'src/scss/vendor/*.scss',
						'src/scss/*.scss'],
				tasks: ['sass:build']
			},
			js: {
				files: ['src/js/project/*.js',
						'src/js/vendor/*.js'],
				tasks: ['concat:project']
			}
		},
		uglify: {
		  	dist: {
		    	files: {
		      		'build/files/js/vendor.min.js':'build/files/js/vendor.min.js',
		      		'build/files/js/main.min.js':'build/files/js/main.min.js'
		    	}
		  	}
		},
		copy: {
		  main: {
		    files: [
		    	{expand: true, cwd: 'build', timestamp:true, src: ['**/**'], dest: 'dist/'}
		    ],
		  },
		},
		browserSync: {
			default_options: {
			    bsFiles: {
			      src: [
			        "build/files/css/main.min.css",
			        "build/files/js/main.min.js",
			        "build/files/js/vendor.min.js",
			        "build/index.html"
			      ]
			    },
			    options: {
			      watchTask: true,
			      server: {
			        baseDir: "build/"
			      }
			    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['concat:vendor', 'concat:project', 'sass:build', 'watch']);
	grunt.registerTask('build', ['concat:vendor', 'concat:project', 'sass:build', 'browserSync', 'watch']);
	grunt.registerTask('production', ['concat:vendor','concat:project', 'sass:dist', 'uglify:dist', 'copy']);
};

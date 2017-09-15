var fs = require('fs');
exec = require('child_process').exec;

var myModuleFiles =
[
	// include jquery
	'js/src/libs/jquery/jquery.js',
	'js/src/libs/jquery/jquery-fn.js',

	'js/src/libs/localstorage.js',
	// 'js/src/libs/jquery.autoComplete.js',
	'js/src/libs/modal.js',
	'js/src/libs/utils.js',
	'js/src/libs/underscore.js',

	// new lib used in siftal
	'js/src/libs/clockpicker/jquery-clockpicker.js',
	'js/src/libs/date/persian-date.js',
	'js/src/libs/date/persian-datepicker.js',
	'js/src/libs/cropper/cropper.js',
	'js/src/libs/cropper/cropperRunner.js',
	'js/src/libs/dataResponse/dataResponse.js',
	'js/src/libs/sortable/Sortable.js',
	'js/src/libs/sortable/SortableRunner.js',

	// tools
	'js/src/tools/barcode-reader.js',
	'js/src/tools/router.js',
	'js/src/tools/navigate.js',
	'js/src/tools/notification.js',
	'js/src/tools/forms.js',

	// use some utitlity
	'js/src/utility/input-files.js',
	'js/src/utility/language.js',
	'js/src/utility/responsive.js',

	'js/src/main.js',
	'js/src/shame.js',
	'js/src/routes.js',
];



module.exports = function (grunt) {
	grunt.initConfig(
		{
			// coffee: {
			// 	compile: {
			// 		files: {
			// 			'js/src/saloos/saloos.js': 'js/src/saloos/*.coffee'
			// 		}
			// 	}
			// },
			bundle: {
				client: {
					options: {
						constants: {
							isNodeModule: false,
							isServer: false,
							isClient: true,
							isDev: true
						},
						minify: false
					},
					files: {
						'js/siftal-pretty.js': 'js/siftal/index.js'
					}
				}
			},
			uglify: {
				options: {
					sourceMap: false,
					mangle: false
				},
				// saloos: {
				// 	options: {
				// 		// mangle: true
				// 	},
				// 	files: {
				// 		'js/src/saloos/saloos.min': [
				// 			'js/src/saloos/*.js'
				// 		]
				// 	}
				// },
				siftal:
				{
					files:
					{
						'js/siftal.js': myModuleFiles,
					}
				}
				// datepicker: {
				//   files: {
				//     'js/datepicker.js': [
				//       'js/src/tools/schedule.js',
				//       'js/src/libs/date.js', 'js/src/libs/datepicker.js',
				//       'js/src/libs/clockpicker.js'
				//       ],
				//   }
				// },
				// filemanager: {
				//   files: {
				//     'js/filemanager.js': [
				//       'js/src/libs/socket.io.js',
				//       'js/src/tools/filemanager.js',
				//       'js/src/tools/contextmenu.js',
				//       'js/src/libs/cortex.js', 'js/src/libs/react-addons.js',
				//       'views/build.js'
				//     ]
				//   }
				// },
				// tests: {
				//   files: {
				//     'tests/libs.js': [
				//     'js/src/libs/jquery.js',
				//     'js/src/libs/date.js', 'js/src/libs/datepicker.js',
				//     'js/src/libs/clockpicker.js',
				//     'js/src/libs/underscore.js',
				//     'js/src/localstorage.js', 'js/src/navigate.js',
				//     'js/src/filemanager.js', 'js/src/schedule.js'
				//     ]
				//   }
				// }
			},
			// less: {
			//   css: {
			//     options: {
			//       cleancss: true
			//     },
			//     files: {
			//       'css/main.css': ['css/main.less']
			//     }
			//   }
			// },
			// react: {
			//   views: {
			//     files: {
			//       'views/build.js': 'views/**/*.jsx'
			//     }
			//   }
			// },
			// autoprefixer: {
			//   options: {
			//     browsers: ['Firefox ESR', 'Chrome > 30']
			//   },
			//   'css/main.css': 'css/main.css'
			// },
			// htmlmin: {
			//   html: {
			//     files: {
			//       'dist/index.html': 'index.html',
			//       'dist/file.html': 'file.html'
			//     }
			//   }
			// },
			copy: {
				// ermile: {
				//   files: [
				//     {
				//       expand: true,
				//       src: ['js/*.js'],
				//       dest: '../../../public_html/static/js/',
				//       flatten: true
				//     }
				//   ]
				// },

				all: {
					files: [
						{
							expand: true, flatten: true, src: ['js/siftal.js'],
							dest: '../../js/'
						}
						// ,
						// {
						// 	expand: true, flatten: true, src: ['js/siftal.js'],
						// 	dest: '../../../../saloos-project/public_html/static/js/'
						// },
						// {
						// 	expand: true, flatten: true, src: ['js/siftal.js'],
						// 	dest: '../../../../archiver/public_html/static/js/'
						// }
					]
				}
			},
			watch: {
				// views: {
				//   files: ['views/*'],
				//   tasks: ['react', 'uglify:filemanager']
				// },
				// coffee: {
				// 	files: ['js/src/saloos/*.coffee'],
				// 	tasks: ['coffee:compile']
				// },
				// saloos: {
				// 	files: ['js/src/saloos/saloos.min'],
				// 	tasks: ['ermile_cp']
				// },
				// ermile_cp: {
				// 	files: ['js/src/saloos/*.js'],
				// 	tasks: ['uglify:saloos']
				// },
				siftal:
				{
					files: myModuleFiles,
					tasks: ['uglify:siftal']
				},
				// datepicker: {
				//   files: [
				//       'js/src/tools/schedule.js',
				//       'js/src/libs/date.js', 'js/src/libs/datepicker.js',
				//       'js/src/libs/clockpicker.js'
				//       ],
				//   tasks: ['uglify:datepicker']
				// },
				// filemanager: {
				//   files: ['js/src/tools/filemanager.js', 'js/src/tools/contextmenu.js'],
				//   tasks: ['uglify:filemanager']
				// },
				// mv: {
				//   files:  ['js/src/libs/react-addons.js', 'js/src/libs/cortex.js'],
				//   tasks: ['uglify:mv']
				// },
				scripts: {
					files: ['js/*.js', 'js/src/libs/*.js', 'js/src/subs/*.js'],
					// tasks: ['copy:ermile', 'copy:talambar', 'copy:all']
					// tasks: ['copy:ermile', 'copy:all']
					tasks: ['copy:all']
				}
				// less: {
				//   files: ['css/**'],
				//   tasks: ['less', 'autoprefixer']
				// },
			}
		});

	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-autoprefixer');
	// grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-open');
	// grunt.loadNpmTasks('grunt-react');
	// grunt.loadNpmTasks('grunt-contrib-coffee');
	// grunt.task.registerTask('ermile_cp', 'A sample task that logs stuff.', function (arg1, arg2) {
	// 	var projects = ['ermile'];
	// 	for (var i = 0; i < projects.length; i++) {
	// 		// var file_name = '../../../../'+projects[i]+'/public_html/static/js/cp/cp.js';
	// 		var file_name = '../../js/cp/cp.js';
	// 		if (fs.existsSync(file_name)) {
	// 			file = fs.readFileSync(file_name).toString();
	// 			saloos = fs.readFileSync('js/src/saloos/saloos.min').toString();
	// 			file = file.replace(/\/\*\*\*cpjs\*\*\*\/([.\r\n\s\S]+)\/\*\*\*cpjs\*\*\*\//gmi, '/***cpjs***/' + saloos + '/***cpjs***/');
	// 			fs.writeFileSync(file_name, file);
	// 			console.log("ermile saved true on cp's");
	// 		}
	// 	}
	// 	args = ['notify-send', '-c', 'Grunt', '-t', '5000', "'End Grunt'", "'saloos'"];
	// 	exec(args.join(' '));
	// });


	var compiler = require('./scripts/compiler');
	grunt.registerMultiTask('bundle', 'Bundle', function () {
		var options = this.data.options;
		this.files.forEach(function (files) {
			var result = compiler.bundle(options, files.src[0]);
			grunt.file.write(files.dest, result);
		});
	});


	// grunt.registerTask('test', ['uglify:tests']);
	// grunt.registerTask('default', ['react', 'uglify', 'less', 'autoprefixer', 'copy', 'coffee', 'ermile_cp', 'watch']);
	// grunt.registerTask('default', ['uglify', 'copy', 'coffee', 'ermile_cp', 'watch']);
	// grunt.registerTask('default', ['bundle', 'uglify', 'copy', 'ermile_cp', 'watch']);
	grunt.registerTask('default', ['bundle', 'uglify', 'copy', 'watch']);
};

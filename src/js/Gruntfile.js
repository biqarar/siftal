var fs = require('fs');
exec = require('child_process').exec;

var myModuleFiles =
[
	// include jquery
	'js/src/libs/jquery/jquery.js',
	'js/src/libs/jquery/jquery-fn.js',

	'js/src/libs/localstorage.js',
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
	'js/src/libs/awesomplete/awesomplete.js',
	'js/src/libs/awesomplete/awesompleteRunner.js',
	'js/src/libs/counter/jquery.counterup.js',
	'js/src/libs/counter/counterRunner.js',
	'js/src/libs/notif/iziToast.js',
	'js/src/libs/notif/notif.js',



	// tools
	'js/src/tools/barcode-reader.js',
	'js/src/tools/router.js',
	'js/src/tools/navigate.js',
	'js/src/tools/forms.js',

	// use some utitlity
	'js/src/utility/input-files.js',
	'js/src/utility/language.js',
	'js/src/utility/responsive.js',
	'js/src/utility/life.js',

	'js/src/main.js',
	'js/src/shame.js',
	'js/src/routes.js',
];



module.exports = function (grunt)
{
	grunt.initConfig(
		{
			uglify: {
				options: {
					sourceMap: false,
					mangle: false
				},

				siftal:
				{
					files:
					{
						'siftal.js': myModuleFiles,
					}
				}
			},
			copy: {

				all: {
					files: [
						{
							expand: true, flatten: true, src: ['siftal.js'],
							dest: '../../js/'
						}
					]
				}
			},
			watch: {
				siftal:
				{
					files: myModuleFiles,
					tasks: ['uglify:siftal']
				},
				scripts: {
					files: ['js/*.js', 'js/src/libs/*.js', 'js/src/subs/*.js'],
					tasks: ['copy:all']
				}
			}
		});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};


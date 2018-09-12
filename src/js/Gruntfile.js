var fs = require('fs');
exec = require('child_process').exec;

var myModuleFiles =
[
	// nojquery, init
	'src/libs/logy/logy.js',

	// include jquery
	// 'src/libs/jquery/jquery-2.1.1.min.js',
	// 'src/libs/jquery/jquery-2.2.4.min.js',
	'src/libs/jquery/jquery-3.3.1.min.js',
	'src/libs/jquery/jquery-migrate-3.0.1.js',
	'src/libs/jquery/jquery-fn.js',

	'src/libs/localstorage.js',
	'src/libs/modal/modal.js',
	'src/libs/utils.js',
	'src/libs/underscore.js',

	// new lib used in siftal
	'src/libs/clockpicker/jquery-clockpicker.js',
	'src/libs/clockpicker/clockpickerRunner.js',

	'src/libs/date/persian-date.js',
	'src/libs/date/persian-datepicker.js',
	'src/libs/date/runDatepicker.js',

	// 'src/libs/cropper/cropper.js',
	// 'src/libs/cropper/cropperRunner.js',
	'src/libs/dataResponse/dataResponse.js',
	'src/libs/sortable/Sortable.js',
	'src/libs/sortable/SortableRunner.js',
	// 'src/libs/awesomplete/awesomplete.js',
	// 'src/libs/awesomplete/awesompleteRunner.js',
	'src/libs/counter/jquery.counterup.js',
	'src/libs/counter/counterRunner.js',
	'src/libs/notif/iziToast.js',
	'src/libs/notif/notif.js',
	'src/libs/codeReader/codeReader.js',
	'src/libs/cursor/cursor.js',
	'src/libs/tagDetector/tagDetector.js',
	'src/libs/tippy/tippy.min.js',
	'src/libs/tippy/tippyRunner.js',
	'src/libs/uploader/uploader.min.js',
	'src/libs/uploader/uploaderRunner.js',
	'src/libs/shortkey/shortkey.js',
	'src/libs/nprogress/nprogress.js',
	// semantic
	'src/libs/semantic-ui/api/api.min.js',
	'src/libs/semantic-ui/transition/transition.min.js',
	'src/libs/semantic-ui/dropdown/dropdown.min.js',
	'src/libs/semantic-ui/dropdown/dropdownRunner.js',



	// tools
	'src/tools/navigate.js',
	'src/tools/forms.js',

	// use some utitlity
	'src/utility/fnCaller.js',
	'src/utility/fitNumber.js',
	'src/utility/urlParam.js',
	'src/utility/formTools.js',

	'src/utility/clock.js',
	'src/utility/input-files.js',
	'src/utility/language.js',
	'src/utility/responsive.js',
	'src/utility/life.js',
	'src/utility/enter.js',
	'src/utility/weAreHere.js',
	'src/utility/json.js',
	'src/utility/smoothScroll.js',
	'src/utility/inputChecker.js',


	'src/main.js',
	'src/pushState.js',
];



module.exports = function (grunt)
{
	grunt.initConfig(
	{
		uglify:
		{
			options:
			{
				sourceMap: false,
				mangle: false
			},
			siftal:
			{
				files:
				{
					'siftal.min.js': myModuleFiles,
				}
			}
		},
		copy:
		{
			all:
			{
				files:
				[
					{
						expand: true,
						flatten: true,
						src: ['siftal.min.js'],
						dest: '../../dist/js/'
					}
				]
			}
		},
		watch:
		{
			siftal:
			{
				files: myModuleFiles,
				tasks: ['uglify:siftal']
			},
			scripts:
			{
				files: ['*.js'],
				tasks: ['copy:all']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};


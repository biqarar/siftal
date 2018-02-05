
/**
 * [runCropper description]
 * @param  {[type]} _args [description]
 * @return {[type]}       [description]
 */
function runCropper(_args)
{
	$('.cropper').each(function()
	{
		var $myCropper   = $(this);
		var myImg       = $myCropper.attr('data-img');
		var myImgTarget = null;
		var myModal     = null;
		// if we have defined img use it
		if(myImg)
		{
			if( myImg === 'modal')
			{

			}
			else
			{
				// else use defined selector
				myImgTarget = $myCropper.find(myImg);
			}
		}
		else
		{
			// if img is not defined try to find one img inside cropper
			myImgTarget = $myCropper.find('img');
		}
		if(myImgTarget && myImgTarget.length>0)
		{
			// get first child of this img
			myImgTarget = myImgTarget.get(0);
		}
		else
		{
			return false;
		}

		// get all options of cropper
		var myImgOptions = cropperGetOptions($myCropper);
		// create new cropper
		var cropperObj   = new Cropper(myImgTarget, myImgOptions);
		// connect cropper object to data for direct access
		$myCropper.data('cropObj', cropperObj);
		// bind all function to croper
		cropperBindFunc($myCropper, cropperObj);



		var URL        = window.URL || window.webkitURL;
		var inputFiles = $myCropper.find('input[type=file]');
		if (URL && inputFiles.length > 0)
		{
			inputFiles.on('change', function()
			{
				var myFiles = this.files;
				var file;

				if (cropperObj && myFiles && myFiles.length)
				{
					file = myFiles[0];

					if (/^image\/\w+/.test(file.type))
					{
						uploadedImageType = file.type;

						// if we have url before this, revoke it
						// if (uploadedImageURL !== undefined)
						// {
						//   URL.revokeObjectURL(uploadedImageURL);
						// }

						// create blob url
						imageUrl = URL.createObjectURL(file);
						// replace cropper
						cropperObj.replace(imageUrl);
						// this.value = imageUrl;
						// logy(imageUrl);

						// another way is change src, destroy and create again
						// myImgTarget.src = imageUrl;
						// cropperObj.destroy();
						// cropperObj      = new Cropper(myImgTarget, myImgOptions);
						// this.value      = null;
						$(this).parent('.input').removeClass('error');
						$(this).parent('.input').addClass('ok');
					}
					else
					{
						$(this).parent('.input').removeClass('ok');
						$(this).parent('.input').addClass('error');
						// logy('Please choose an image file!');
					}
				}
			})
		}

	});
}




/**
 * [cropperGetOptions description]
 * @param  {[type]} _cropper [description]
 * @return {[type]}          [description]
 */
function cropperGetOptions(_cropper)
{
	// define with default values
	var myImgOptions =
	{
		aspectRatio: 1,
		viewMode: 2,
		dragMode: 'move',
	};
	// get aspect Ratio
	if(_cropper.attr('data-aspectRatio'))
	{
		myImgOptions.aspectRatio = _cropper.attr('data-aspectRatio');
	}
	// change view mode, not need on normal conidtions
	if(_cropper.attr('data-view'))
	{
		myImgOptions.viewMode = _cropper.attr('data-view');
	}
	// show clone of image in preview container
	if(_cropper.attr('data-preview'))
	{
		myImgOptions.preview = _cropper.attr('data-preview');
	}
	// show clone of image in preview container
	if(_cropper.attr('data-preview'))
	{
		myImgOptions.preview = _cropper.attr('data-preview');
	}
	// set min container width
	if(_cropper.attr('data-minContainerWidth'))
	{
		myImgOptions.minContainerWidth = _cropper.attr('data-minContainerWidth');
	}
	// set min container height
	if(_cropper.attr('data-minContainerHeight'))
	{
		myImgOptions.minContainerHeight = _cropper.attr('data-minContainerHeight');
	}
	// set min canvas width
	if(_cropper.attr('data-minCanvasWidth'))
	{
		myImgOptions.minCanvasWidth = _cropper.attr('data-minCanvasWidth');
	}
	// set min canvas height
	if(_cropper.attr('data-minCanvasHeight'))
	{
		myImgOptions.minCanvasHeight = _cropper.attr('data-minCanvasHeight');
	}
	// set min CropBox width
	if(_cropper.attr('data-minCropBoxWidth'))
	{
		myImgOptions.minCropBoxWidth = _cropper.attr('data-minCropBoxWidth');
	}
	// set min CropBox height
	if(_cropper.attr('data-minCropBoxHeight'))
	{
		myImgOptions.minCropBoxHeight = _cropper.attr('data-minCropBoxHeight');
	}
	// return created object
	return myImgOptions;
}



/**
 * bind all alowed func for cropper
 * @param  {[type]} _cropper    [description]
 * @param  {[type]} _cropperObj [description]
 * @return {[type]}             [description]
 */
function cropperBindFunc(_cropper, _cropperObj)
{
	// connect all data-func inside cropper to be okay
	_cropper.find('[data-func]').each(function()
	{
		var myFuncData   = $(this).attr('data-func');
		var myFunc       = null;
		var myFuncParam1 = null;
		var myFuncParam2 = null;
		// if have parameter, seperate and detect 2 parameter
		if(myFuncData.indexOf('_') !== -1)
		{
			myFunc       = myFuncData.substr(0, myFuncData.indexOf('_'));
			myFuncParam1 = myFuncData.substr(myFuncData.indexOf('_') + 1);
			myFuncParam2 = myFuncData.substr(myFuncData.indexOf(',') + 1);
		}
		else
		{
			// use all of text as func name
			myFunc = myFuncData;
		}
		// bind function to btns in element area
		$(this).off("click");
		$(this).on("click", function(_e)
		{
			if(myFunc && typeof _cropperObj[myFunc] === 'function')
			{
				if(myFuncParam1)
				{
					if(myFuncParam2)
					{
						// call with 2 param
						_cropperObj[myFunc](myFuncParam1, myFuncParam2);
					}
					else
					{
						// call with one param
						_cropperObj[myFunc](myFuncParam1);
					}
				}
				else
				{
					// call without param
					_cropperObj[myFunc]();
				}
			}
		});
	});
}



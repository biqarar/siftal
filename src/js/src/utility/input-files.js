
/**
 * show preview of input file if its posible
 * @return {[type]} [description]
 */
function runInputFileFunc()
{
	$('input[type="file"]').on('change', function()
	{
		var $this       = $(this);
		var $fileBox    = $this.parents('.input');
		var $cropperBox = $this.parents('.cropper');
		var myFile      = this.files[0];
		// user not select file, cancel choosing file
		if(!myFile)
		{
			// clear old file and remove preview and some other if needed
			$this.attr('data-size', null);
			return false;
		}

		// get and set selected file size
		var fileSize = Math.round( myFile.size / 1024);
		$this.attr('data-size', fileSize);

		// check min and max value if exist
		checkInputFileSize(fileSize, $this, $fileBox);
		// check and if needed generate preview of file from input file
		checkInputPreview(false, myFile, fileSize, $this, $fileBox);



		if($this.attr('data-crop'))
		{
			var $modal = $('#' + $this.attr('data-crop'));
			$modal.trigger('open', $fileBox);

			// on click okay
			$cropperBox.find('[data-ok]').off('click')
			$cropperBox.find('[data-ok]').on('click', function()
			{
				var cropObj          = $cropperBox.data('cropObj');
				var $croppedInput    = $cropperBox.find('.input.preview');
				var $croppedInputEl  = $croppedInput.find('input[type=file]');

				// create a canvas from selected area
				canvasImg = cropObj.getCroppedCanvas();
				if(!canvasImg)
				{
					console.log('has error! not found!');
					return false;
				}

				canvasImg.toBlob(function(_blob)
				{
					// create url for new blob
					myUrl = URL.createObjectURL(_blob);
					// $croppedInputEl.val(myUrl);
					console.log(myUrl);
					checkInputPreview(true, myUrl, fileSize, $this, $fileBox);
					console.log('replaced image');
				});
			});

			// // clear all history!
			// $cropperBox.find('.modal').on('close', function(_e, _b, _c)
			// {
			// 	console.log('cancel operation..');
			// 	console.log(_e);
			// 	console.log(_b);
			// 	console.log(_c);
			// });

			$cropperBox.find('[data-cancel]').off('click');
			$cropperBox.find('[data-cancel]').on('click', function()
			{
				console.log('cancel...');
				checkInputPreview(true, null, fileSize, $this, $fileBox);
			});

		}
	});
}





/**
 * [checkInputFileSize description]
 * @param  {[type]} _size     [description]
 * @param  {[type]} _input    [description]
 * @param  {[type]} _inputBox [description]
 * @return {[type]}           [description]
 */
function checkInputFileSize(_size, _input, _inputBox)
{
	var hasError = null;

	// check for min file size
	if(_input.attr('data-min'))
	{
		// if size is less than needed size
		if(_size < _input.attr('data-min'))
		{
			hasError = true;
		}
	}

	// check for max file size
	if(_input.attr('data-max'))
	{
		// if size is less than needed size
		if(_size > _input.attr('data-max'))
		{
			hasError = true;
		}
	}

	// if has error add error class
	if(hasError)
	{
		_inputBox.addClass('error');
		_inputBox.removeClass('warning');
		_inputBox.removeClass('ok');
	}
	else
	{
		_inputBox.removeClass('error');
		_inputBox.removeClass('warning');
		_inputBox.addClass('ok');
	}
}



/**
 * [checkInputPreview description]
 * @param  {[type]} _file     [description]
 * @param  {[type]} _size     [description]
 * @param  {[type]} _input    [description]
 * @param  {[type]} _inputBox [description]
 * @return {[type]}           [description]
 */
function checkInputPreview(_direct, _file, _size, _input, _inputBox)
{
	// if have preview start creating preview
	if(!_direct && _input.attr('data-preview') === undefined)
	{
		return false;
	}

	var myLabel   = _input.parent().find('label');
	var myImgPrev = myLabel.find('img');

	if(_size && _size > 1024)
	{
		// remove last image preview
		if(myImgPrev)
		{
			myImgPrev.attr('src', null);
		}
		// add error class and remove all other classes
		_inputBox.addClass('error');
		_inputBox.removeClass('ok');
		_inputBox.removeClass('warning');
		return false;
	}
	else
	{
		_inputBox.removeClass('error');
	}
	_inputBox.removeClass('ok');
	_inputBox.removeClass('warning');


	if(myImgPrev.length < 1)
	{
		// create img element and replace it in html
		var myImg = document.createElement("img");
		myImg.id  = _input.attr('id') + 'Preview';
		myLabel.html(myImg);
		// get new inserted img
		myImgPrev = myLabel.find('img');
	}

	// get image path and ext
	var imgPath = _input[0].value;
	// _input.val(null);
	var imgExt  = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
	// if selected valid extention for preview
	if (imgExt == "gif" || imgExt == "png" || imgExt == "jpg" || imgExt == "jpeg")
	{
		if(_direct)
		{
			// fix src of image container
			myImgPrev.attr('src', _file);
			if(_file)
			{
				_inputBox.addClass('ok');
			}
		}
		else
		{
			// if file reader is defined!
			if (typeof (FileReader) != "undefined")
			{
				// create new reader
				var reader = new FileReader();

				reader.onload = function (e)
				{
					// get loaded data and render thumbnail.
					myImgPrev.attr('src', e.target.result);
				};

				// read the image file as a data URL.
				reader.readAsDataURL(_file);
				_inputBox.addClass('ok');
			}
			else
			{
				console.log('file reader is undefined!');
				var blobURL = window.URL.createObjectURL(_file);
				myImgPrev.attr('src', blobURL);
				_inputBox.addClass('warning');
			}
		}
	}
	else
	{
		console.log('we cant preview this type of file');
		myImgPrev.attr('src', null);
		_inputBox.addClass('warning');
	}
}



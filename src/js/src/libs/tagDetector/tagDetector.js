/**
 * v3.0
 */

runTagDetector();
/**
 * [runTagDetector description]
 * @return {[type]} [description]
 */
function runTagDetector()
{
	// handle enter
	$(document).on('keypress', '.tagDetector .tagInput', function(e)
	{
		// if Enter pressed disallow it and run add func
		switch(e.which)
		{
			// enter
			case 13:
			// comma
			case 44:
			// semicolon
			case 59:
				addNewTags(this);
				return false;
				break;

			default:
				break;
		}
	});
	// handle click on btn
	$(document).on('click', '.tagDetector .tagAdd' , function ()
	{
		addNewTags(this);
		$(this).closest('.tagDetector').find('.tagInput').focus();
		return false;
	});
	// on click on existing tag, show it for edit
	$(document).on('click', '.tagDetector .tagBox span' , function ()
	{
		// get value of clicked tag
		var $this          = $(this);
		var clickedTagText = $this.text().trim();
		var clickedTagVal  = clickedTagText;
		var myDetector     = $this.closest('.tagDetector');
		var attrData       = getTagLists(myDetector);
		var elInput        = myDetector.find('.tagInput');
		var attrRestrict   = myDetector.attr('data-restrict');
		// if restricted list use value instead of text
		if(attrRestrict === 'list')
		{
			clickedTagVal = $this.attr('data-val').trim();
		}
		// remove from array of data
		attrData.splice(attrData.indexOf(clickedTagVal), 1);
		// set taglist
		setTagList(myDetector, attrData);
		// fill text in input and set focus
		elInput.val(clickedTagText).focus();
		// remove element
		$this.remove();
	});
}


/**
 * [initTagDetector description]
 * @return {[type]} [description]
 */
function initTagDetector()
{
	var myDetector     = $('.tagDetector');
	myDetector.each(function(_el)
	{
		var myTags = getTagLists(myDetector);
		var $Detector = $(this);
		// add each tag exist as html element
		// for each elemetn add as new element
		$.each(myTags, function( _key, _val )
		{
			addNewTagsEl($Detector, _val);
		});
	});
}


/**
 * [addNewTags description]
 * @param {[type]} _elChilds [description]
 */
function addNewTags(_elChilds)
{
	// detect parent tag detector
	var myDetector = $(_elChilds).closest('.tagDetector');

	// if tag is not finded return false
	if(myDetector.length != 1)
	{
		return null;
	}
	// get detector main elements
	var elInput = myDetector.find('.tagInput');
	var elBox   = myDetector.find('.tagBox');
	// get bind vals
	var attrBindInput     = myDetector.attr('data-bind-input');
	var attrBindBox       = myDetector.attr('data-bind-box');
	var attrRestrict      = myDetector.attr('data-restrict');
	var attrLimit         = parseInt(myDetector.attr('data-limit'));
	var attrData          = getTagLists(myDetector);

	if(attrData.length >= attrLimit)
	{
		return 'reach limit';
	}

	// if wanna bind box to specefic content, set it
	if(attrBindInput)
	{
		elInput = myDetector.find(attrBindInput);
	}
	// if wanna bind box to specefic content, set it
	if(attrBindBox)
	{
		elBox = myDetector.find(attrBindBox);
	}
	// get value of tag input
	var inputText = elInput.val();
	// empty value of tag
	elInput.val('');
	// if isnot set return false
	if(inputText)
	{
		inputText = inputText.trim();
	}
	if(!inputText)
	{
		return false;
	}
	var myNewTag = inputText;
	// if restrict to list, then return and show disallow
	if(attrRestrict === 'list')
	{
		elInput.addClass("isDisallow");
		setTimeout(function () { elInput.removeClass("isDisallow") }, 500);
		return;
	}
	// if exist in old list
	if(attrData.indexOf(myNewTag) >= 0)
	{
		// get element of exist tag
		var elTagExist = elBox.find('[data-val="' + myNewTag + '"]');
		elTagExist.addClass("isExist");
		setTimeout(function () { elTagExist.removeClass("isExist") }, 500);
	}
	else
	{
		// append to array of tags
		attrData.push(myNewTag);
		// set tagList
		setTagList(myDetector, attrData);
		// add as html element
		addNewTagsEl(myDetector, inputText);
	}
}


/**
 * [addNewTagsEl description]
 * @param {[type]} _detector [description]
 * @param {[type]} _tag      [description]
 */
function addNewTagsEl(_detector, _tag)
{
	console.log(_detector);
	var elBox             = _detector.find('.tagBox');
	var attrBindBoxFormat = _detector.attr('data-box-format');
	// if box format isnt setm use default format
	if(!attrBindBoxFormat)
	{
		attrBindBoxFormat = "<span>:tag</span>";
	}
	// replace :tag with real value
	var elNewTag = attrBindBoxFormat.replace(':tag', _tag);
	// add data-val for detecting for add on duplicate
	elNewTag     = $(elNewTag).attr('data-val', _tag);
	// append to boxes
	elBox.append(elNewTag);
}


/**
 * [getTagLists description]
 * @param  {[type]} _detector [description]
 * @return {[type]}           [description]
 */
function getTagLists(_detector)
{
	var attrData = _detector.find('.tagVals').val();
	if(attrData != undefined && attrData.trim() != '')
	{
		attrData = attrData.split(',');
	}
	else
	{
		attrData = [];
	}

	return attrData;
}


/**
 * [setTagList description]
 * @param {[type]} _detector [description]
 * @param {[type]} _data     [description]
 */
function setTagList(_detector, _data)
{
	var elVals      = _detector.find('.tagVals');
	var attrBindVal = _detector.attr('data-bind-val');
	// if wanna bind vals to specefic content, set it
	if(attrBindVal)
	{
		elVals = _detector.find(attrBindVal);
	}
	// add to textarea of elements
	elVals.val(_data.join());
}
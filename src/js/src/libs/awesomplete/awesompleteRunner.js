

/**
 * [fillAuto description]
 * @return {[type]} [description]
 */
function fillAuto()
{
	// // for each elements using autoList create variable
	$('.autoList').each(function(_el)
	{
		// bind list data
		bindAwesomplete.call(this);

		var parentEl = $($(this).attr('data-parent'));
		if(parentEl.length)
		{
			// if has data
			if(parentEl.val() || $(this).val())
			{
				// do nothing
			}
			else
			{
				$(this).attr('disabled', '');
			}
		}
	});
	// on foucs to autoList input
	// $(document).on('focus', '.autoList', function(_e)
	// {
	// 	if($(this).val().length === 0 && $(this).data('Awesomplete'))
	// 	{
	// 		$(this).data('Awesomplete').open();
	// 	}
	// });

	// on change input of each list call fill datalist func
	$(document).on('input', '.autoList[data-find]', function(e)
	{
		var $this          = $(this);
		var search_timeout = $this.attr('data-search-timeout');
		if(search_timeout)
		{
			clearTimeout(search_timeout);
		}
		var timeout = setTimeout(function()
		{
			if($this.val().trim().length > 0)
			{
				fillDataList($this);
			}
			else
			{
				var myAutoList  = $this.data('Awesomplete');
				// updat datalist
				myAutoList.list = null;
			}
			// disable child on change
			var myChild = $('.autoList[data-parent="#' + $this.attr('id') + '"]')
			myChild.attr('disabled', '');
			// remove data-search-timeout attr
			$this.attr('data-search-timeout', null);
		}, 300);
		$this.attr('data-search-timeout', timeout);

	});

	// on each autoList after select add as tag
	$(document).on('awesomplete-selectcomplete', ".autoList[data-parent]", function()
	{
		// if this field is parent of another, enable and transfer focus to it
		var myChild = $('.autoList[data-parent="#' + this.id + '"]')
		myChild.attr('disabled', null);
		myChild.focus();
		// call func if needed
		var myFunc = $(this).attr('data-call');
		// if function exist and callable
		if(myFunc && callFunction(myFunc, null, true))
		{
			callFunction(myFunc, this);
		}
	});
}


/**
 * [bindAwesomplete description]
 * @return {[type]} [description]
 */
function bindAwesomplete()
{
	var $this = $(this);
	var maxItems = $this.attr('data-maxItems');
	if(maxItems <= 3 || maxItems >= 20 || maxItems === undefined)
	{
		maxItems = 10;
	}
	var tmpObj = new Awesomplete(this,
	{
		minChars: 1,
		maxItems: maxItems,
		autoFirst: true,
		sort: false,
		filter: function (_text, _input)
		{
			// if we have label, search only in label, not more
			if(_text.label)
			{
				if(_text.label.indexOf(_input) >= 0)
				{
					return true;
				}
				return false;
			}
			return true;
		},
		replace: function(text)
		{
			myText = text.label;
			tmpPosStart = myText.indexOf('<b>');
			tmpPosEnd = myText.indexOf('</b>');
			// if have tag b use text in this tag as label
			if( tmpPosStart >= 0 && tmpPosEnd > 0)
			{
				myText = myText.substring(tmpPosStart + 3, tmpPosEnd)
				// save value to data-val if it's different
				$this.attr('data-val', text.value);
			}

			this.input.value = myText;
		}
	});
	// bind to data to connect later
	$this.data('Awesomplete', tmpObj);
}


/**
 * [saveAutoComplete description]
 * @return {[type]} [description]
 */
function fillDataList(_this)
{
	// get vals for search
	var listName    = $(_this).attr('data-find');
	var findAddr    = $(_this).attr('data-find-addr');
	var parentCode  = $(_this).attr('data-parent');
	var searchTerm  = $(_this).val().trim();
	// prepare sended data
	var sendData    = {};
	sendData.json   = true;
	sendData.list   = listName;
	sendData.q      = searchTerm;
	// if parent set as class or id give it value
	if(parentCode && $(parentCode).length > 0)
	{
		parentCode = $(parentCode).attr('data-val');
	}
	// if parent is set, send it
	if(parentCode !== undefined)
	{
		sendData.parent = parentCode;
	}
	// try to abort old request
	try { xhr.abort(); } catch(e){}
	// try to get new list from server
	if(!findAddr)
	{
		findAddr = $(location).attr('href');
	}

	var xhr = $.get(findAddr, sendData, function(_data)
	{
		// clear result given from server
		var datalist    = clearJson(_data);
		// save for next use
		$(_this).data('datalist', datalist);
		// get awesomplete obj
		var myAutoList  = $(_this).data('Awesomplete');
		// updat datalist
		myAutoList.list = prepareDatalistArray(datalist);
	});


	/**
	 * [prepareDatalistArray description]
	 * @param  {[type]} _data [description]
	 * @return {[type]}       [description]
	 */
	function prepareDatalistArray(_datalist)
	{
		if(!_datalist)
		{
			return null;
		}
		var list = _datalist.map(function(_i)
		{
			// define inner object
			var opt = {};
			opt.label = '<b>' + _i.title + '</b>';
			if(_i.count)
			{
				opt.label += '<var>' + _i.count + '</var>';
			}
			if(_i.desc)
			{
				opt.label += '<span>' + _i.desc + '</span>';
			}
			if(_i.desc2)
			{
				opt.label += '<abbr>' + _i.desc2 + '</abbr>';
			}
			// set value
			opt.value = _i.title;
			if(_i.value)
			{
				opt.value = _i.value;
			}
			return opt;
		});

		return list;
	}
}



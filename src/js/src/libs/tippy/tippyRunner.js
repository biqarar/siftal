var myTippy;

function runTippy()
{
	if($('html').attr('data-app') === undefined)
	{
		// removeTippy();
		myTippy = tippy('[title]',
		{
			arrow: true,
			animation: 'scale',
			dynamicTitle: true,
		});
	}
}


function removeTippy()
{
	var allTippy = document.querySelectorAll('[data-tippy]');

	allTippy.forEach(function(_el)
	{
		if(_el._tippy)
		{
			_el._tippy.hide();
		}
	});

	// if(myTippy)
	// {
	// 	myTippy.destroyAll();
	// }
}


var myTippy;

function runTippy()
{
	if(myTippy)
	{
		myTippy.destroyAll();
	}

	myTippy = tippy('[title]',
	{
		arrow: true,
		animation: 'scale',
		dynamicTitle: true,
	});

}


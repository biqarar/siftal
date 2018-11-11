

function escPressed()
{
	$myFocus = $(":focus");
	// if user focused on everything remove focus from it
	if($myFocus.length > 0)
	{
		// if($myFocus.is('input') || $myFocus.is('textarea') || $myFocus.is('select'))
		// {
		// 	$myFocus.trigger("blur");
		// }

		$myFocus.trigger("blur");
		return true;
	}

	// detect url and try to go one level up
	var myNewAddr = window.location.protocol + '//';
	var myHost    = window.location.host;
	var myPath    = window.location.pathname;
	if(myPath.substring(0, 1) === '/')
	{
		myPath = myPath.substring(1);
	}

	if(myPath)
	{
		var myContent = $('body').attr('data-in');
		var myPage    = $('body').attr('data-page');
		// clean value
		if(myContent === 'site')
		{
			myContent = null;
		}
		if(myPage === 'home')
		{
			myPage = null;
		}

		// try to remove path if exist
		if(myPage)
		{
			// go to site base in all condition
			myNewAddr += myHost + '/';
			if(myContent)
			{
				// go to root of this contenct
				myNewAddr += myContent;
			}
		}
		else
		{
			myNewAddr += myHost + '/';
		}

	}
	else
	{
		if(myHost.split('.').length > 2)
		{
			// we dont have path, try to remove subdomain if exist
			myNewAddr += myHost.replace(/^[^.]+\./g, "");
		}
		else
		{
			myNewAddr = null;
		}
	}

	if(myNewAddr)
	{
		// try to navigate to new url
		Navigate( { url: myNewAddr });
	}
	console.log(myNewAddr);
}


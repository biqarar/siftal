
function googleAnalyticsNewPage()
{
	if(typeof window['ga'] === 'function')
	{
		ga('set',
		{
			page: window.location.href,
			title: $('title').text()
		});
		ga('send', 'pageview');
	}

}


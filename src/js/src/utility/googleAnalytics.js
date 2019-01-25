
function googleAnalyticsNewPage()
{
	if(typeof window['gtag'] === 'function')
	{
		var origin = window.location.protocol + '//' + window.location.host;
		var pathname = window.location.href.substr(origin.length);
		gtag('config', 'GA_TRACKING_ID', {'page_path': pathname});
	}

}


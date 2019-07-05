function registerServiceWorker()
{
	if ('serviceWorker' in navigator)
	{
		window.addEventListener('load', () =>
		{
			navigator.serviceWorker.register('/serviceWorker/v2').then(function(_reg)
			{
				// Registration was successful
				logy('Service worker registered.', _reg);
			}, function(_err)
			{
				// registration failed :(
				logy('ServiceWorker registration failed: ', _err);
			}).catch(function(_err)
			{
				logy(_err);
			});
		});
	}
	else
	{
		logy('service worker is not supported');
	}
}
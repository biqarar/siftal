if ('serviceWorker' in navigator)
{
	window.addEventListener('load', () =>
	{
		navigator.serviceWorker.register('/serviceWorker.js').then(function(_reg)
		{
			// Registration was successful
			console.log('Service worker registered.', _reg);
		}, function(_err)
		{
			// registration failed :(
			console.log('ServiceWorker registration failed: ', _err);
		}).catch(function(_err)
		{
			console.log(_err);
		});
	});
}
else
{
	console.log('service worker is not supported');
}
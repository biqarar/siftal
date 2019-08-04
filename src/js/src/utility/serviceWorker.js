function registerServiceWorker()
{
	removeAllServiceWorkers();
	return false;
	// need more work
	if ('serviceWorker' in navigator)
	{
		window.addEventListener('load', () =>
		{
			navigator.serviceWorker.register('/serviceWorker-v3?v=3').then(function(_reg)
			{
				// Registration was successful
				logy('Service worker registered.');
			}, function(_err)
			{
				// registration failed :(
				logy('ServiceWorker registration failed.');
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

function removeAllServiceWorkers()
{
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.getRegistrations().then(function (registrations)
	  {
	    //returns installed service workers
	    if (registrations.length)
	    {
	      for(let registration of registrations)
	      {
	        registration.unregister();
	      }
	    }
	  });
	}
}

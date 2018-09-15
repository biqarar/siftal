
function pingi()
{
  // ping google to check internet connection
  // pingiGoogle();
  // ping our website to check our website is up or not!
  pingiWebsite();

  // on fail do something
  $('body').on('pingi:website:fail', function()
  {
    console.log($("body").attr('data-offline'));
    // show notif on offline mode if we cant see website
    if($("body").attr('data-offline') === undefined)
    {
      notif('fatal', "We can't see "+ window.location.hostname, 'Connection is lost', 5000, {'position':'topCenter', 'icon':'sf-plug', 'displayMode':1});
    }

    // set offline mode
    $("body").attr('data-offline', '');
  });

  // if we are get online again
  $('body').on('pingi:website:ok', function()
  {
    // we are online and now again online
    if($("body").attr('data-offline') === undefined)
    {

    }
    else
    {
      notif('okay', "We are online on "+ window.location.hostname, 'Connection is re-established', 5000, {'position':'topCenter', 'icon':'sf-link', 'displayMode':1});
    }

  });

}


function pingiWebsite()
{
  $.ajax(
    {
      url: window.location.protocol + "//" + window.location.hostname,
      cache: false,
      timeout: 500,
      processData: false,
      contentType: false,
      // dataType: 'json',
      data :
      {
          'cmd' : 'ping',
      },
    })
    .done(function(data, status, xhr)
    {
      console.log('We are okay!');
      $("body").trigger("pingi:website:ok");
    })
    .fail(function(_result, _textStatus, _error)
    {
      console.log('fail get website with ping :|');
      $("body").trigger("pingi:website:fail");
    }
  );
}


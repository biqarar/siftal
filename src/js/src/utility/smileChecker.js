
function checkSmileLoop()
{
  setInterval(function()
  {
    checkSmile();;
  }, 5000);
}


function checkSmile(_register)
{
  if(_register)
  {
    checkSmileLoop();
  }

  $.ajax(
  {
    url:"/account/smile",
    method:"POST",
    dataType:"json",
    success:function(smileResult)
    {
      if(checkSmileLogout(smileResult))
      {
        // if is not logged out check notifications
        checkNewNotification(smileResult);
      }
    }
  });

}


function checkSmileLogout(_data)
{
  if(_data.ok !== true)
  {
    var logoutTxt = 'Logout';
    var logoutUrl = '/logout';

    if(_data.logoutTxt !== true)
    {
      logoutTxt = _data.logoutTxt;
    }
    if(_data.logoutUrl !== true)
    {
      logoutUrl = _data.logoutUrl;
    }

    say(
    {
      type: 'warning',
      html: logoutTxt,
      showConfirmButton: false,
      timer: 1000,
      onClose: () =>
      {
        location.replace(logoutUrl);
      }
    });
    return false;
  }

  return true;
}


function checkNewNotification(_data)
{
  var notifEl = $('.siftal .dashHead .notification');
  if(_data.newNotif)
  {
    if(notifEl.attr('data-new') === undefined)
    {
      // new notif and does not exist before it
    }

    notifEl.attr('data-new', '');
  }
  else
  {
    notifEl.attr('data-new', null);
  }
}


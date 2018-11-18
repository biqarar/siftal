
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
      checkNewNotification(smileResult);
    }
  });

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




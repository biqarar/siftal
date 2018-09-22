

function catchBeforeUnload()
{
  window.addEventListener("beforeunload", function (e)
  {
    // send close with ajax
    $.ajax(
    {
      method: "POST",
      data: { cmd: "unload"},
      dataType: 'json',
      // async: false,
      cache: false
    });

    return;
  });
}


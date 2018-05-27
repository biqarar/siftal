
function dropdownRunner()
{
  $('.ui.dropdown').each(function ()
  {
    var $myDropDown = $(this);
    // allow add new value
    if($myDropDown.hasClass('addition'))
    {
      $myDropDown.dropdown({allowAdditions: true});
      return true;
    }

    // run with remote source
    if($myDropDown.attr('data-source') !== undefined)
    {
      // $.api.settings.cache = false;
      $myDropDown.dropdown(
      {
        forceSelection: false,
        apiSettings:
        {
          url: $myDropDown.attr('data-source'),
          cache: false,
          // onResponse : function(serverResponse)
          // {
          //   $myDropDown.prop('lastData', serverResponse);
          //   return serverResponse;
          // }
        }

      });
      return true;
    }
    // run normal dropdown
    $myDropDown.dropdown();
  });
}


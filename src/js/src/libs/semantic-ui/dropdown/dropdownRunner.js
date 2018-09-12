
function dropdownRunner()
{
  $('.ui.dropdown').each(function ()
  {
    var $myDropDown = $(this);
    setTimeout(function()
    {
      if($myDropDown.attr('autofocus') !== undefined)
      {
        var searchEl = $myDropDown.parents('.ui.dropdown').find('.search');
        if(searchEl)
        {
          searchEl.trigger("focus");
        }
      }
    }, 100);

    // allow add new value
    if($myDropDown.hasClass('addition'))
    {
      $myDropDown.dropdown(
      {
        allowAdditions: true
      });
      return true;
    }

    // run with remote source
    if($myDropDown.attr('data-source') !== undefined)
    {
      // $.api.settings.cache = false;
      $myDropDown.dropdown(
      {
        forceSelection: false,
        minCharacters: 1,
        apiSettings:
        {
          url: $myDropDown.attr('data-source'),
          cache: false
        }
      });
      return true;
    }

    // run with remote source
    if($myDropDown.attr('data-search') !== undefined)
    {
      $myDropDown.dropdown(
      {
        forceSelection: false,
        minCharacters: 2,
        action: function(_text, _value)
        {
          // hide dropdown and clear selected value
          $myDropDown.dropdown('hide');
          $myDropDown.dropdown('clear');
          // get lastData of server response
          var lastResponse = $myDropDown.prop('lastData');
          if(lastResponse && lastResponse.result)
          {
            lastResponse = lastResponse.result;
            $.each(lastResponse, function(index, responseVal)
            {
              if(responseVal && responseVal.datalist && responseVal.datalist.id)
              {
                if(_value === responseVal.datalist.id)
                {
                  // logy(responseVal.datalist);
                  $("body").trigger("dropdown:selected:datalist", responseVal.datalist);
                }
              }
            });
          }
          $("body").trigger("dropdown:selected", _value);
        },
        apiSettings:
        {
          url: $myDropDown.attr('data-search'),
          cache: false,
          onResponse : function(_serverResponse)
          {
            $myDropDown.prop('lastData', _serverResponse);
            return _serverResponse;
          }
        }
      });
      return true;
    }


    // run normal dropdown
    $myDropDown.dropdown();
  });
}

function clearDropdown(_el)
{
  // checo if el exist and corrent
  _el.dropdown('hide');
  _el.dropdown('clear');
}



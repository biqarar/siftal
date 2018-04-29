
function dropdownRunner()
{
  $('.ui.dropdown').each(function ()
  {
    // allow add new value
    if($(this).hasClass('addition'))
    {
      $(this).dropdown({allowAdditions: true});
      console.log($(this));
      return true;
    }

    // run with remote source
    if($(this).attr('data-source') !== undefined)
    {
      $(this).dropdown(
      {
        apiSettings: {url: $(this).attr('data-source')}
      });
      return true;
    }
    // run normal dropdown
    $(this).dropdown();
  });
}


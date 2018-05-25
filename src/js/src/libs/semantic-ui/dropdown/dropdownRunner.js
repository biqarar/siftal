
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
      // $.api.settings.cache = false;
      $(this).dropdown(
      {
        forceSelection: false,
        apiSettings: {url: $(this).attr('data-source'), cache: false}
      });
      return true;
    }
    // run normal dropdown
    $(this).dropdown();
  });
}


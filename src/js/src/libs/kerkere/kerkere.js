
function kerkere()
{
  $(document).off('click', '.kerkereTitle');
  $(document).on('click', '.kerkereTitle', function()
  {
    console.log(11);
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');

    //Hide the other panels
    $(".kerkereContent").not($(this).next()).slideUp('fast');

  });
}


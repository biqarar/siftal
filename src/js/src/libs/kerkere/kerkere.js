
function kerkere()
{
  $(document).off('click', '.kerkere-toggle');
  $(document).on('click', '.kerkere-toggle', function()
  {
    console.log(11);
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');

    //Hide the other panels
    $(".kerkere-content").not($(this).next()).slideUp('fast');

  });
}


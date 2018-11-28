
function kerkere()
{
  $(document).off('click', '[data-kerkere]');
  $(document).on('click', '[data-kerkere]', function()
  {
    var $this    = $(this);
    var myTarget = $($this.attr('data-kerkere'));

    if(myTarget.length)
    {
      //Expand or collapse this panel
      myTarget.slideToggle('fast');
    }

    //Hide the other panels
    $(".kerkereContent").not($(this).next()).slideUp('fast');

  });
}


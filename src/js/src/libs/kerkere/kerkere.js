
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
    if($this.attr('data-kerkere-single') !== undefined)
    {
      $('[data-kerkere-content]').not(myTarget).slideUp('fast');
      // $(".kerkereContent").not($(this).next()).slideUp('fast');
    }
  });
}


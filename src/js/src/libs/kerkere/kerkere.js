
function kerkere()
{
  $(document).off('click', '[data-kerkere]');
  $(document).on('click', '[data-kerkere]', function()
  {
    var $this    = $(this);
    var myTarget = $($this.attr('data-kerkere'));

    if(myTarget.length)
    {
      // if want icon
      if($this.attr('data-kerkere-icon') !== undefined)
      {
        if(myTarget.is(":visible"))
        {
          // on next this will closed
          $this.attr('data-kerkere-icon', 'close');
        }
        else
        {
          // on next this will open
          $this.attr('data-kerkere-icon', 'open');
        }
      }

      //Expand or collapse this panel
      myTarget.slideToggle('fast');
    }

    if($this.attr('data-kerkere-single') !== undefined)
    {

      //Hide the other panels
      $('[data-kerkere-content]').not(myTarget).slideUp('fast');
      // change icon of all other
      $('[data-kerkere]').not($this).attr('data-kerkere-icon', 'close');
    }
  });
}


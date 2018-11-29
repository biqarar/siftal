
function kerkereRunner()
{
  $(document).off('click', '[data-kerkere]');
  $(document).on('click', '[data-kerkere]', function()
  {
    kerkere($(this));
  });
}


function kerkere(_this)
{
    var myTarget = null;
    var $target  = null;
    if(_this)
    {
      myTarget = _this.attr('data-kerkere');
      if(myTarget)
      {
        $target = $(myTarget);
      }
    }

    if($target && $target.length)
    {
      // show status if needed
      var myStatusEl = '[data-kerkere-look="'+ myTarget +'"]';

      // if want icon
      if(_this.attr('data-kerkere-icon') !== undefined)
      {
        if($target.is(":visible"))
        {
          // on next this will closed
          _this.attr('data-kerkere-icon', 'close');
          $(myStatusEl).attr('data-kerkere-status', 'close');
        }
        else
        {
          // on next this will open
          _this.attr('data-kerkere-icon', 'open');
          $(myStatusEl).attr('data-kerkere-status', 'open');
        }
      }

      //Expand or collapse this panel
      $target.slideToggle('fast');
    }

    if(_this.attr('data-kerkere-single') !== undefined)
    {
      //Hide the other panels
      $('[data-kerkere-content]').not($target).slideUp('fast');
      // change icon of all other
      $('[data-kerkere][data-kerkere-icon]').not(_this).attr('data-kerkere-icon', 'close');
    }
}

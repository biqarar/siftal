
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
    if(_this)
    {
      myTarget = _this.attr('data-kerkere');
      if(myTarget)
      {
        myTarget = $(myTarget);
      }
    }

    if(myTarget && myTarget.length)
    {
      // if want icon
      if(_this.attr('data-kerkere-icon') !== undefined)
      {
        if(myTarget.is(":visible"))
        {
          // on next this will closed
          _this.attr('data-kerkere-icon', 'close');
        }
        else
        {
          // on next this will open
          _this.attr('data-kerkere-icon', 'open');
        }
      }

      //Expand or collapse this panel
      myTarget.slideToggle('fast');
    }

    if(_this.attr('data-kerkere-single') !== undefined)
    {

      //Hide the other panels
      $('[data-kerkere-content]').not(myTarget).slideUp('fast');
      // change icon of all other
      $('[data-kerkere][data-kerkere-icon]').not(_this).attr('data-kerkere-icon', 'close');
    }
}

var myTippy;

function runTippy()
{
  if($('html').attr('data-app') === undefined)
  {
    tippy.hideAll({ duration: 0 });

    // removeTippy();
    myTippy = tippy('[title]',
    {
      arrow: true,
      animation: 'scale',
      content(reference)
      {
        var title = reference.getAttribute('title');
        reference.removeAttribute('title');
        if(!title)
        {
          title = null;
        }
        return title;
      },
      // dynamicTitle: true,
    });
  }
}


function removeTippy()
{
  var allTippy = document.querySelectorAll('[data-tippy]');

  allTippy.forEach(function(_el)
  {
    if(_el._tippy)
    {
      _el._tippy.hide();
    }
  });

  // if(myTippy)
  // {
  //  myTippy.destroy();
  // }
}


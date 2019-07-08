var myTippy;

function runTippy()
{
  if($('html').attr('data-app') === undefined)
  {
    tippy.hideAll({ duration: 0 });

    myTippy = tippy('[title]',
    {
      arrow: true,
      animation: 'scale',
      aria: null,
      touch: false,
      content(reference)
      {
        var title = reference.getAttribute('title');
        reference.removeAttribute('title');
        // save title on data-tippy
        reference.setAttribute('data-tippy', title);
        var oldTitle = reference.getAttribute('data-tippy');
        // if title is not exist use old title
        // if(!title)
        // {
        //   title = oldTitle;
        // }

        return title;
      },
    });
  }
}


// function removeTippy()
// {
//   var allTippy = document.querySelectorAll('[data-tippy]');

//   allTippy.forEach(function(_el)
//   {
//     if(_el._tippy)
//     {
//       _el._tippy.destroy(true);
//     }
//   });

//   // if(myTippy)
//   // {
//   //  myTippy.destroy();
//   // }
// }


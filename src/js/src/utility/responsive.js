
/**
 * handle responsive sidebar on mobile and tablets
 * @return {[type]} [description]
 */
function responsiveSidebar()
{
  $('body').on('mousedown touchmove', function(_e)
  {
    if($(_e.target).parents('.sidenavHandler').length || $(_e.target).hasClass('sidenavHandler') )
    {
      // click on hanlder, do nothing!
      $("body").attr('data-sidebar', 'dada');
    }
    else if($(_e.target).parents('#sidebar').length)
    {
      // do nothing because clicked on sidebar
    }
    else if($(_e.target).is('#sidebar'))
    {
      // do nothing because clicked on sidebar
    }
    else if($('body').attr('data-sidebar') === undefined)
    {
      // do nothing because its none!
    }
    else
    {
      $("body").attr('data-sidebar', null);
    }
  });

  $('#sidebar a[href]').on('click', function()
  {
      setTimeout(function()
      {
        $("body").attr('data-sidebar', null);
      }, 500);
  });

  $('.toggleClean').off('click');
  $('.toggleClean').on('click', function()
  {
    if($('body').attr('data-clean') === undefined)
    {
      $("body").attr('data-clean', '');
    }
    else
    {
      $("body").attr('data-clean', null);
      $("body").attr('data-sidebar', null);
    }
  });

  // $('#sidebar ul.sidenav > li > a').click(function()
  // {
  //   var menuTitle = $(this);
  //   var submenu   = $(this).parent().children('ul');
  //   logy(submenu);
  //   if (submenu)
  //   {
  //     submenu.stop().slideToggle(300);
  //     menuTitle.toggleClass('open');
  //   }
  // });
}


/**
 * v1.0.0
 * clone one element if needed
 */

/**
 * [bindHtmlShortkey description]
 * @return {[type]} [description]
 */
function cloner()
{
  var $cloners = $("[data-cloner]");
  // add cloner class to them:)
  $cloners.before($cloners.clone().addClass("cloner")).attr('data-cloner', null);


  // on body scroll used in siftal
  $(window).on("scroll load", function()
  {
    var myScroll = $("html").scrollTop() || $("body").scrollTop();
    $.each($('.cloner'), function(index, val)
    {
      var clonerTrigger = parseInt($(this).attr('data-cloner'));
      if(clonerTrigger)
      {
        if(myScroll > clonerTrigger)
        {
          $(this).attr('data-cloner-trigger', myScroll);
        }
        else
        {
          $(this).attr('data-cloner-trigger', null);
        }
      }
    });
  });
}


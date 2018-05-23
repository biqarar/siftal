
/**
 * [watchScroll description]
 * @param  {[type]} _this [description]
 * @return {[type]}       [description]
 */
function watchScroll(_this)
{
  // watch simple links
  $('a[href*="#"]:not([href="#"])', _this).click(function()
  {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
    {
      var hash   = this.hash;
      var target = $(hash);
      target = target.length ? target : $('[name=' + hash.slice(1) +']');
      if (target.length)
      {
        scrollSmooth(target, hash);
        return false;
      }
    }
  });

  $('[data-scroll-to]', _this).click(function()
  {
    var hashtag = $(this).attr('data-scroll-to');
    var target  = $('#'+ hashtag);
    scrollSmooth(target, hashtag);
  });
}


/**
 * find last element with data-scroll attr and goto this position
 * @return {[type]} [description]
 */
function findPushStateScroll()
{
  var target = $('[data-scroll]:last');
  scrollSmooth(target, null, 200, target.attr('data-scroll'));
}


/**
 * [scrollSmooth description]
 * @param  {[type]} _target  [description]
 * @param  {[type]} _hashtag [description]
 * @param  {[type]} _timing  [description]
 * @return {[type]}          [description]
 */
function scrollSmooth(_target, _hashtag, _timing, _arg)
{
  if(_target && _target.length == 1)
  {
    if(_timing)
    {
      setTimeout(function()
      {
        scrollSmoothTo(_target, _hashtag, (_timing*2), _arg);
      }, _timing);
    }
    else
    {
      scrollSmoothTo(_target, _hashtag, 0, _arg);
    }
  }
}


/**
 * [scrollSmoothTo description]
 * @param  {[type]} _target  [description]
 * @param  {[type]} _hashtag [description]
 * @param  {[type]} _timing  [description]
 * @return {[type]}          [description]
 */
function scrollSmoothTo(_target, _hashtag, _timing, _arg)
{
  if(_arg === 'off')
  {
    return false;
  }
  // if wanna goto near top of page or exactly top, set target to zero
  var targetOffset;
  if($.isNumeric(_target))
  {
    targetOffset = _target;
  }
  else if(_target === 'top')
  {
    targetOffset = 0;
  }
  else
  {
    targetOffset = _target.offset().top - 10;
  }
  // if target is near top of page, scroll to top
  if(targetOffset<100 || _arg === 'top')
  {
    targetOffset = 0;
  }
  // get curent pos and calc diff to that location
  var currentPos = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
  var diff       = Math.abs(currentPos - targetOffset);
  // do not run scroll on little ones
  if(diff < 50)
  {
    return false;
  }
  // if timing is more than 0.5s then replace with smaller one
  if(_timing>500)
  {
    _timing = 300;
  }
  else
  {
    // calc timing with size of scroll
    _timing  = Math.round(diff/2);
    // if timing is very short, replace with 0.2s
    if(_timing<100)
    {
      _timing = 100;
    }
    else if(_timing>1500)
    {
      _timing = 1000;
    }
  }

  var page = $("html, body");
  // add event to page to allow to stop scroll
  page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function()
  {
    page.stop();
  });
  // animate to target position
  page.animate(
  {
    scrollTop: targetOffset
  }, _timing, function()
  {
    if(_hashtag)
    {
      window.location.hash = _hashtag;
    }
    // remove events form page
    page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
  });
}







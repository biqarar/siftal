

/**
 * check time in second
 * @return {[type]} [description]
 */
function checkLifeOfPage()
{
  $life = $('body').attr('data-life');

  if($.isNumeric($life) && $life >= 0)
  {
    $life = $life * 1000;
  }
  else
  {
    return false;
  }

  setTimeout(function()
  {
    Navigate({url: window.location.pathname, replace: true});
  }, $life);
}

// run once a time not on pushstate
checkLifeOfPage();


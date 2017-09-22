

/**
 * scheduler to run on specefic time
 * @param  {[type]} _fn       [description]
 * @param  {[type]} _datetime [description]
 * @return {[type]}           [description]
 */
function scheduler(_fn, _datetime)
{
  var diff = _datetime - Date.now();
  if(diff < 0)
  {
    return false;
  }

  setTimeout(_fn, _time);
}



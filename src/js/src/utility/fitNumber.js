
/**
 * [fitNumber description]
 * @param  {[type]} _num [description]
 * @return {[type]}      [description]
 */
function fitNumber(_num, _seperator)
{
  // if needed do not show as local string
  if(_seperator !== false)
  {
    // if is not number set zero
    if(isNaN(_num))
    {
      _num = 0;
    }
    else
    {
      _num = parseFloat(_num);
    }
    _num = _num.toLocaleString();
  }
  else
  {
    _num = _num.toString();
  }
  if($('html').attr('lang') === 'fa')
  {
    _num = _num.toFarsi();
  }
  else if($('html').attr('lang') === 'ar')
  {
    _num = _num.toArabic();
  }
  else
  {
    _num = _num.toEnglish();
  }
  return _num;
}


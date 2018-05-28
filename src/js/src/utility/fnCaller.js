
/**
 * call function if exist
 * @param  {[type]} _funcName [description]
 * @return {[type]}       [description]
 */
function callFunc(_funcName, _arg, _onlyCheckExist)
{
  isExist = false;
  // if wanna to call function and exist, call it
  if(_funcName && typeof window[_funcName] === 'function')
  {
    isExist = true;
    if(!_onlyCheckExist)
    {
      try
      {
        window[_funcName](_arg);
      }
      catch(err)
      {
        console.error(err.message);
      }
    }
  }
  return isExist;
}



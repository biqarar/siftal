
/**
 * [clearJson description]
 * @param  {[type]} _data [description]
 * @return {[type]}       [description]
 */
function clearJson(_data, _forceArray)
{
  var list = null;
  if(_data && _data.result && _data.result.list)
  {
    list = _data.result.list;
    list = JSON.parse(list);
    if(list)
    {
      // do nothing
    }
    else
    {
      list = [];
    }
  }
  if(!list && _forceArray)
  {
    list = [];
  }
  return list;
}


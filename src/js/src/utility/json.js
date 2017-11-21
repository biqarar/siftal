
/**
 * [clearJson description]
 * @param  {[type]} _data [description]
 * @return {[type]}       [description]
 */
function clearJson(_data, _forceArray)
{
  var list = null;
  if(_data && _data.msg && _data.msg.list)
  {
    list = _data.msg.list;
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


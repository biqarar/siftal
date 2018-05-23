
/**
 * [urlParam description]
 * @param  {[type]} _request [description]
 * @return {[type]}          [description]
 */
function urlParam(_request)
{
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  var result = null;
  var params = [];

  // detect and set key and value into params
  for(i = 0; i < sURLVariables.length; i++)
  {
    var cParameter   = sURLVariables[i].split('=');
    var sParameterValue = cParameter[1] === undefined ? true : cParameter[1];
    params[cParameter[0]] = sParameterValue;
  }

  // if params is requested, return it
  // else return all of params into object
  if(_request)
  {
    if(params[_request])
    {
      result = params[_request];
    }
  }
  else
  {
    result = params;
  }

  return result;
};


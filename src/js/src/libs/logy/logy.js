/**
 * v1.0
 * used in Siftal and integrated with Dash
 */


/**
 * simple logy function to check and run console
 * @param  {[type]} _val  [description]
 * @param  {[type]} _type [description]
 * @return {[type]}       [description]
 */
function logy(_val, _type)
{
  // check console is enable!
  if (window.console && window.console.log)
  {
    if(allowLogy())
    {
      switch (_type)
      {
        case 'info':
          console.info(_val);
          break;

        case 'warn':
          console.warn(_val);
          break;

        case 'debug':
          console.debug(_val);
          break;

        case 'error':
          console.error(_val);
          break;

        case 'log':
        default:
          console.log( _val);
          break;
      }
    }
    else
    {
      // only show console in develop mode:)
      return false;
    }
  }
  return true;
}


/**
 * check logy is allow or not
 * @return {[type]} [description]
 */
function allowLogy()
{
  var $html = document.getElementsByTagName("html")[0];

  if($html && $html.getAttribute('data-develop') !== null)
  {
    return true;
  }

  return false;
}

/**
 * can toggle status of logy, for example used by shortkey or ...
 * @return {[type]} [description]
 */
function toggleLogy()
{
  var $html = document.getElementsByTagName("html")[0];
  if($html)
  {
    console.log($html.getAttribute('data-develop'));
    if($html.getAttribute('data-develop') === null)
    {
      $html.setAttribute("data-develop", '');
    }
    else
    {
      $html.removeAttribute("data-develop");
    }
  }
}



/**
 * [notif description]
 * @param  {[type]} _type  [description]
 * @param  {[type]} _msg   [description]
 * @param  {[type]} _title [description]
 * @return {[type]}        [description]
 */
function notif(_type, _msg, _title, _delay)
{
  var notifOpt = {};

  // detect type of notify to show
  switch(_type)
  {
    case 'true':
    case 'success':
      _type = 'success';
      break;

    case 'warn':
    case 'warning':
      _type = 'warning';
      break;

    case 'error':
      _type = 'error';
      break;

    default:
      _type = 'info';
      break;
  }
  // add message
  if(_msg)
  {
    notifOpt.message = _msg;
  }
  // add title
  if(_title)
  {
    notifOpt.title = _title;
  }
  // add delay if exit
  console.log(_delay);
  if(Number.isInteger(_delay) || _delay==false || _delay==='false' )
  {
    notifOpt.timeout = _delay;
  }

  // change some default options
  notifOpt.layout = 2;
  // notifOpt.transitionIn = 'fadeInLeft';
  // notifOpt.rtl    = true;

  // run if exist
  if(typeof iziToast[_type] === 'function')
  {
    iziToast[_type](notifOpt);
  }
  else
  {
    console.log('where is notif!?');
    return false;
  }
  return true;
}


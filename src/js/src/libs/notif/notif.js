/**
 * v1.0.0
 * Hanlde notification and generate final notif via existing lib
 */

/**
 * [notif description]
 * @param  {[type]} _type  [description]
 * @param  {[type]} _msg   [description]
 * @param  {[type]} _title [description]
 * @return {[type]}        [description]
 */
function notif(_type, _msg, _title, _timeout, _opt)
{
  var notifOpt = {};

  // detect type of notify to show
  switch(_type)
  {
    case 'true':
    case 'success':
    case 'okay':
    case 'ok':
      _type = 'success';
      break;

    case 'warn':
    case 'warning':
      _type = 'warning';
      break;

    case 'fatal':
    case 'danger':
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
  if(Number.isInteger(_timeout) || _timeout==false || _timeout==='false')
  {
    notifOpt.timeout = _timeout;
  }

  // get extra options of notify
  if(_opt)
  {
    // add position
    if(_opt.position)
    {
      notifOpt.position = _opt.position;
    }
    // add target
    if(_opt.target)
    {
      notifOpt.target = _opt.target;
    }
    // add icon
    if(_opt.icon)
    {
      notifOpt.icon = _opt.icon;
    }
    // add image
    if(_opt.image)
    {
      notifOpt.image = _opt.image;
    }
    // add image
    if(_opt.theme)
    {
      notifOpt.theme = _opt.theme;
    }
  }

  // change some default options
  notifOpt.layout = 2;
  if($('body').hasClass('rtl'))
  {
    notifOpt.rtl = true;
  }

  // notifOpt.transitionIn = 'fadeInLeft';

  // run if exist
  if(typeof iziToast[_type] === 'function')
  {
    iziToast[_type](notifOpt);
  }
  else
  {
    logy('where is notif!?');
    return false;
  }
  return true;
}



/**
 * [runHtmlNotif description]
 * @return {[type]} [description]
 */
function runHtmlNotif()
{
  $('[data-notif][data-notif-autorun]').each(function(_el)
  {
    getNotifData($(this));
  });

  $('[data-notif]').off('click');
  $('[data-notif]').on('click', function(_el)
  {
    getNotifData($(this));
  });
}


function getNotifData(_el)
{
    var notifOpt      = {}
    // get main variables
    notifOpt.type     = _el.attr('data-notif-type');
    notifOpt.message  = _el.attr('data-notif');
    notifOpt.title    = _el.attr('data-notif-title');
    notifOpt.timeout  = _el.attr('data-notif-timeout');
    // get extra variables
    notifOpt.target   = _el.attr('data-notif-target');
    notifOpt.position = _el.attr('data-notif-pos');
    notifOpt.icon     = _el.attr('data-notif-icon');
    notifOpt.image     = _el.attr('data-notif-image');

    notif(notifOpt.type, notifOpt.message, notifOpt.title, notifOpt.timeout, notifOpt);
}

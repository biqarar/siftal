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


function notifGenerator(_data, $_form)
{
  var result =
  {
    error: false,
  };

  if($_form)
  {
    $_form.find('input').removeClass('error warn');
  }

  for(var recordId in _data)
  {
    // get each record data
    var recordData     = _data[recordId];
    var recordDataMeta = recordData.meta;
    var recordTitle    = null;
    // set delay to show notif
    var delay          = undefined;
    if($_form && $_form.attr('data-delay'))
    {
      delay = $_form.attr('data-delay');
    }

    // get title if exist
    if(recordDataMeta && recordDataMeta.title)
    {
      recordTitle = recordDataMeta.title;
    }

    // generate new notif
    notif(recordData.type, recordData.text, recordTitle, delay);

    // set flag of error
    if(recordData.type == 'error')
    {
        result.error = true;
    }


    // highlight some field for forms
    if($_form)
    {
      // remove error sign of each element if exist
      $_form.find('input').removeClass('error');
      $_form.find('select').removeClass('error');
      $_form.find('textarea').removeClass('error');

      // if want to do something with element, get it from result
      if(recordDataMeta)
      {
        var myElementHighlight = recordDataMeta.element;
        if(myElementHighlight)
        {
          try
          {
            myElementHighlight = JSON.parse(myElementHighlight);
          } catch(e) {}

        }
        else if(!_.isArray(recordDataMeta))
        {
          myElementHighlight = recordDataMeta;
        }

        if(myElementHighlight)
        {
          (_.isArray(myElementHighlight) ? myElementHighlight : [myElementHighlight]).forEach(function(_e)
          {
            var $el = $_form.find('input[name="' + _e + '"]');
            if($el.length === 0)
            {
              $el = $_form.find('select[name="' + _e + '"]');
            }
            if($el.length === 0)
            {
              $el = $_form.find('textarea[name="' + _e + '"]');
            }

            $el.addClass('error');
          });
        }
      }
    }

  }
  return result;
}


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
  if($.isNumeric(_timeout))
  {
    notifOpt.timeout = _timeout;
  }
  else if(_timeout == false || _timeout === 'false')
  {
    notifOpt.timeout = false;
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
    // add iconcolor
    if(_opt.iconColor)
    {
      notifOpt.iconColor = _opt.iconColor;
    }
    // add iconcolor
    if(_opt.displayMode)
    {
      notifOpt.displayMode = _opt.displayMode;
    }
    // add iconcolor
    if(_opt.transitionIn)
    {
      notifOpt.transitionIn = _opt.transitionIn;
    }
    // add timeout
    if(_opt.timeout && $.isNumeric(_opt.timeout))
    {
      notifOpt.timeout = _opt.timeout;
    }
    else if(_opt.timeout == false || _opt.timeout === 'false')
    {
      notifOpt.timeout = false;
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

  if(_data && _data.msg)
  {
    _data = _data.msg;
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
      if(recordData.text || recordTitle)
      {
        notif(recordData.type, recordData.text, recordTitle, delay, recordDataMeta);
      }

      // set flag of error
      if(recordData.type == 'error')
      {
          result.error = true;
      }


      // highlight some field for forms
      if($_form)
      {
        // remove error sign of each element if exist
        $_form.find('input').removeClass('error warn ok').parent().removeClass('error warn ok');
        $_form.find('select').removeClass('error warn ok');
        $_form.find('textarea').removeClass('error warn ok');

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
              // if parent is .input, highlihgt it
              if($el.parent().is('.input'))
              {
                $el = $el.parent();
              }
              if($el.length === 0)
              {
                $el = $_form.find('select[name="' + _e + '"]');
              }
              if($el.length === 0)
              {
                $el = $_form.find('textarea[name="' + _e + '"]');
              }

              $el.addClass(recordData.type);
            });
          }
        }
      }
    }
  }
  else
  {
    return false;
  }

  return result;
}


function notifConfirm(_this, _data, _msg, _title, _okayBtn, _closeBtn)
{
  if(_this !== undefined)
  {
    _data     = _this.attr('data-data');
    _msg      = _this.attr('data-msg');
    _title    = _this.attr('data-title');
    _okayBtn  = _this.attr('data-okayBtn');
    _closeBtn = _this.attr('data-closeBtn');
  }
  if(!_data)
  {
    logy('data not sended!');
    return false;
  }
  if(_msg === undefined)
  {
    _msg = 'Do you confirm?';
  }
  if(_title === undefined)
  {
    _title = '';
  }
  if(_okayBtn === undefined)
  {
    _okayBtn = 'Ok';
  }
  if(_closeBtn === undefined)
  {
    _closeBtn = 'Close';
  }

  iziToast.show({
      theme: 'dark',
      icon: 'question-circle',
      title: _title,
      message: _msg,
      position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      progressBarColor: 'rgb(0, 255, 184)',
      buttons:
      [
          ["<button data-ajaxify data-method='post' data-data='"+ _data +"'>"+ _okayBtn +'</button>', function (instance, toast){
            // do something if needed
            instance.hide(
            {
              transitionOut: 'flipOutX'
              // ,
              // onClosing: function(instance, toast, closedBy)
              // {
              //   // send ajaxify
              //   // logy('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
              // }
            }, toast, 'buttonName');
          }, true], // true to focus
          ['<button>' + _closeBtn +'</button>', function (instance, toast){
            instance.hide(
            {
              transitionOut: 'fadeOutUp'
              // ,
              // onClosing: function(instance, toast, closedBy)
              // {
              //   // logy('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
              // }
            }, toast, 'buttonName');
          }]
      ]
      // ,
      // onOpening: function(instance, toast)
      // {
      //     // logy('callback abriu!');
      // },
      // onClosing: function(instance, toast, closedBy)
      // {
      //     // logy('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
      // }
  });
}



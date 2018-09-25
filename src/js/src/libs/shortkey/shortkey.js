/**
 * v1.0.0
 * bind shortkey to specefic link or button
 */

// bind shortkeys
bindHtmlShortkey();

/**
 * [bindHtmlShortkey description]
 * @return {[type]} [description]
 */
function bindHtmlShortkey()
{
  $(document).on("keydown", function(_e) { shortkey_corridor.call(this, _e)});
}


/**
 * corridor of all events on keyboard and mouse
 * @param  {[type]} e     the element that event doing on that
 * @param  {[type]} _self seperated element for doing jobs on it
 * @param  {[type]} _key  the key pressed or click or another events
 * @return {[type]}       void func not returning value! only doing job
 */
function shortkey_corridor(_e, _self, _key)
{
  if(!_key)
  {
    _key = _e.which;
  }

  _self = $(_self);
  var ctrl   = _e.ctrlKey  ? 'ctrl'  : '';
  var shift  = _e.shiftKey ? 'shift' : '';
  var alt    = _e.altKey   ? 'alt'   : '';
  var mytxt  = String(_key) + ctrl + alt + shift;

  // logy(mytxt, 'info');

  var elShortkey = $('[data-shortkey= '+ mytxt +']');
  if(elShortkey.length == 1)
  {
    if(elShortkey.attr('data-shortkey-prevent') !== undefined)
    {
      // prevent default
      _e.preventDefault();
    }
    // this shortkey has called function
    if(shortkeyCallFunc(elShortkey, _e))
    {
      // if yes prevent default changes
      _e.preventDefault();
    }
    else
    {
      shortkeyDo(elShortkey);
    }

  }
  else if(shortkeyCallFunc(elShortkey, _e))
  {
    // if yes prevent default changes
    _e.preventDefault();
  }
  else if(mytxt === '112')
  {
    // prevent any other change
    _e.preventDefault();
    // call support fn
    shortkeySupport();
  }
}


function shortkeyDo(_elShortkey)
{
  var effectTimeout = 0;
  if(_elShortkey.attr('data-shortkey-timeout'))
  {
    effectTimeout = _elShortkey.attr('data-shortkey-timeout');
  }

  // else do some default event like click or set focus
  if(_elShortkey.is('a[href], a[href] *, button, input[type=submit]'))
  {
    var myInputClickable = _elShortkey[0];
    if(myInputClickable)
    {
      if(effectTimeout)
      {
        $(myInputClickable).addClass('clicked');
        setTimeout(function()
        {
          $(myInputClickable).removeClass('clicked');
          // click with javascript not jquery
          myInputClickable.click();
        }, effectTimeout);
      }
      else
      {
        // click with javascript not jquery
        myInputClickable.click();
      }
      return true;
    }
    else
    {
      $(_elShortkey).addClass('clicked');
      setTimeout(function()
      {
        $(_elShortkey).removeClass('clicked');
        _elShortkey.trigger("click");
      }, effectTimeout);
      return true;
    }
    return;
  }
  else if(_elShortkey.is('input, select, textarea'))
  {
    $(_elShortkey).addClass('clicked');
    setTimeout(function()
    {
      $(_elShortkey).removeClass('clicked');
      _elShortkey.trigger("focus");
    }, effectTimeout);
    return true;
  }

  return null;
}


/**
 * [shortkeyCallFunc description]
 * @return {[type]} [description]
 */
function shortkeyCallFunc(_elShortkey, _e)
{
    var myFuncCall = _elShortkey.attr('data-shortkey-call');
    // this shortkey has called function
    if(myFuncCall !== undefined)
    {
      myFuncCall = 'shortkey_'+ myFuncCall;
      // if function exist
      if(callFunc(myFuncCall, null, true))
      {
        callFunc(myFuncCall, _e);
        return true;
      }
      else
      {
        logy('shortkey func is not exist!');
      }
    }
    return false;
}


function shortkeySupport()
{
  var supportURL = 'support';
  if($('html').attr('lang') !== undefined)
  {
    supportURL = '/'+ $('html').attr('lang')+ '/'+ supportURL;
  }
  // open support in new tab
  window.open(supportURL, '_blank');
}


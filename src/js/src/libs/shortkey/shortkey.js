/**
 * v1.0.0
 * bind shortkey to specefic link or button
 */

// bind shortkeys
bindHtmlShortkey();
var lastKeyPressed;
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

  if(String(_key) === '16')
  {
    // shift
    return null;
  }
  else if(String(_key) === '17')
  {
    // ctrl
    return null;
  }
  else if(String(_key) === '18')
  {
    // alt
    return null;
  }


  // logy(mytxt, 'info');

  var elShortkey = $('[data-shortkey="'+ mytxt +'"]');

  // try to search for combine mode
  if(elShortkey.length == 0)
  {
    var $focused = $(':focus');
    if(lastKeyPressed && !$focused.is('input'))
    {
      var mytxt2 = lastKeyPressed + "+" + mytxt;
      elShortkey = $('[data-shortkey="'+ mytxt2 +'"]');
    }
  }


  if(elShortkey.length == 1)
  {
    // check if in input or textarea return false;
    if($focused && ($focused.is('input') || $focused.is('textarea') || $focused.is('select') || $focused.hasClass('medium-editor-element')) && (String(_key) > 48 || String(_key) < 90 ))
    {
      // do nothing
    }
    else
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
  }
  else if(mytxt === '112')
  {
    // prevent any other change
    _e.preventDefault();
    // call support fn
    shortkeySupport();
  }

  // set lastKeyPressed Value
  lastKeyPressed = mytxt;
}


function shortkeyDo(_elShortkey)
{
  var effectTimeout = 0;
  if(_elShortkey.attr('data-shortkey-timeout'))
  {
    effectTimeout = _elShortkey.attr('data-shortkey-timeout');
  }

  // else do some default event like click or set focus
  if(_elShortkey.is('a[href], a[href] *, button, input[type=submit], [data-link]'))
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
      if(effectTimeout)
      {
        $(_elShortkey).addClass('clicked');
        setTimeout(function()
        {
          $(_elShortkey).removeClass('clicked');
          _elShortkey.trigger("click");
        }, effectTimeout);
      }
      else
      {
        _elShortkey.trigger("click");
      }
      return true;
    }
    return;
  }
  else if(_elShortkey.is('input, select, textarea'))
  {
    if(effectTimeout)
    {
      $(_elShortkey).addClass('clicked');
      setTimeout(function()
      {
        $(_elShortkey).removeClass('clicked');
        _elShortkey.trigger("focus");
      }, effectTimeout);
    }
    else
    {
      _elShortkey.trigger("focus");
    }
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


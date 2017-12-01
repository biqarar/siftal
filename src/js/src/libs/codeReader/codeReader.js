// Barcode khan

(function(root, $)
{
  root.barcodeOptions =
  {
    min: 2,
    speed: 30
  };

  var time = 0
  var keys = '';

  var timeout = 0;
  $(document.body).keydown(function(_e)
  {
    // if we are not have barcode in this page, return
    if($('.barCode').length < 1)
    {
      return;
    }
    // if we have timeout clear it, else save time
    if(timeout)
    {
      clearTimeout(timeout);
    }
    else
    {
      time = Date.now();
    }
    $focused = $(':focus');

    // if we are in barcode dont write something
    if($focused.is('.barCode'))
    {
      // if is not lock
      if($focused.attr('data-lock') === undefined)
      {
        // if is not locked!
        if(_e.key === 'Enter')
        {
          if($focused.attr('data-allowEnter') === undefined)
          {
            // if unlocked but dont allow to press enter and enter is pressed, blocked enter
            _e.preventDefault();
          }
        }
      }
      else
      {
        switch(_e.key)
        {
          case 'Backspace':
          case 'Delete':
            _e.preventDefault();
            $focused.val('');
            break;

          case 'Tab':
            // do nothing! be normal
            break;

          case 'Enter':
            if($focused.attr('data-allowEnter') === undefined)
            {
              // in normal condition prevent press enter
              _e.preventDefault();
            }
            else
            {
              // else do nothing, allow to enter
            }
            break;

          default:
            _e.preventDefault();
            break;
        }
      }
    }


    // if we have default and key pressed as fast as posible, prevent next keys
    if($('.barCode[data-default]').length)
    {
      if((Date.now() - time) > 1)
      {
        _e.preventDefault();
      }
    }

    timeout = setTimeout(function()
    {
      if(keys.slice(-5) === 'Enter')
      {
        // remove enter from calc
        keys = keys.slice(0, -5);
        // get len of typed
        var len       = keys.length;
        // calc type speed in micor second
        var typeSpeed = (len / (Date.now() - time)) * 1000;

        // if barcode detected ended with enter
        if(typeSpeed > barcodeOptions.speed && len > barcodeOptions.min)
        {
          // change to english and after that to string
          var detectedCode = keys.toEnglish().toString();
          // bugfix for iranbarcode and change some persian char to en
          detectedCode     = detectedCode.replace('چ', ']').replace('ژ', 'C');
          // prevent default
          // _e.preventDefault();
          var barcodeDefaultInput = $('.barCode[data-default]');

          // get focused element and if we are in barcode fill it
          if($focused.is('.barCode'))
          {
            // replace val in barcode field
            $focused.val(detectedCode);
            // console.log(typeSpeed);
            // try to press enter, fail!
            // e = jQuery.Event("keypress")
            // e.which = 13 //choose the one you want
            // $(".barCode#q").keypress(function(){  }).trigger(e);
          }
          else if(barcodeDefaultInput.length)
          {
            barcodeDefaultInput.val(detectedCode);
            // you allow to press enter at the end of barcode, submit form if exist
            if(barcodeDefaultInput.attr('data-allowEnter') !== undefined)
            {
              $pForm = barcodeDefaultInput.parents('form')
              if($pForm.length)
              {
                $pForm.submit();
              }
            }
            // if used as default barcode, remove last chart if we are in another input
            if($focused.is('input') || $focused.is('textarea'))
            {
              var tmpPos = $focused[0].selectionStart;
              var newVal = $focused.val();
              newVal = newVal.substring(0, tmpPos - 1) + newVal.substring(tmpPos, newVal.length);
              // set new val
              $focused.val(newVal);
            }
          }
          else
          {
            console.log('barcode: ' + detectedCode);
          }
          console.log('barcode: ' + detectedCode);
          $("body").trigger("barcode:detect", detectedCode);
        }
      }
      time    = 0;
      timeout = 0;
      keys    = '';
    }, 20);
    keys += _e.key;
  });
})(window, jQuery);
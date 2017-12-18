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
    // ----------------------------------------- cancel monitoring
    // if we are not have barcode in this page, return
    if($('.barCode').length < 1)
    {
      return;
    }

    // ----------------------------------------- detect target input
    var $focused         = $(':focus');
    var $barcodeTargetEl = null;

    // if current el is barcode this is target
    if($focused.hasClass('barCode'))
    {
      $barcodeTargetEl = $focused;

      // handle lock status of current element, if is lock dont type anychar
      // if we are in barcode dont write something
      var elLock = $focused.attr('data-lock') !== undefined;
      if(elLock)
      {
        switch(_e.key)
        {
          case 'Backspace':
          case 'Delete':
            // remove barcode from element
            var oldVal = $focused.val();
            $focused.val('');
            $("body").trigger("barcode:remove", oldVal , $focused);
            $barcodeTargetEl.attr('data-barcode', null);

            break;

          case 'Tab':
            // do nothing! be normal
            break;

          default:
            _e.preventDefault();
            break;
        }
      }
      else
      {
        switch(_e.key)
        {
          case 'Enter':
            _e.preventDefault();
            break;

          case 'Tab':
            break;

          default:
            $barcodeTargetEl.attr('data-barcode', null);
            // do nothing
            break;
        }
      }
    }
    else if($('.barCode[data-default]').length > 0)
    {
      $barcodeTargetEl = $('.barCode[data-default]');
      // show message if more than one default exist
      if($('.barCode[data-default]').length > 1)
      {
        console.log('more than one default detected!')
      }

      // if we have default and key pressed as fast as posible, prevent next keys
      if((Date.now() - time) > 1)
      {
        _e.preventDefault();
      }
    }
    else
    {
      // we have barcode but its not have focus or set as default
      if(keys.length > 1)
      {
        switch(_e.key)
        {
          case 'Enter':
            _e.preventDefault();
            break;

          case 'Tab':
            break;

          default:
            // do nothing
            break;
        }
      }
      // return;
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

    // on timeout
    timeout = setTimeout(function()
    {
      if(keys.slice(-5) === 'Enter')
      {
        // remove enter from calc
        keys          = keys.slice(0, -5);
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

          if($barcodeTargetEl)
          {
            // replace detected barcode in target el
            $barcodeTargetEl.val(detectedCode);
            $barcodeTargetEl.attr('data-barcode', detectedCode);

            // you can set some func after pass all conditions
            switch($barcodeTargetEl.attr('data-pass'))
            {
              case 'submit':
                //submit form if exist
                $pForm = $barcodeTargetEl.parents('form')
                if($pForm.length)
                {
                  console.log('submit parent form');
                  $pForm.submit();
                }
                break;

              case 'tab':
                if($barcodeTargetEl.is($focused))
                {
                  var inputs = $focused.parents('form').find(':input');
                  inputs.eq( inputs.index($focused)+ 1 ).focus();
                }
                break;

              default:
                if(!$barcodeTargetEl.is($focused))
                {
                  $barcodeTargetEl.focus();
                }
                // check call funtions
                // ...
                break;
            }

            // if target is not current input
            if(!$barcodeTargetEl.is($focused))
            {
              // if used as default barcode, remove last chart if we are in another input
              if($focused.is('input') || $focused.is('textarea'))
              {
                var tmpPos = $focused[0].selectionStart;
                var newVal = $focused.val();
                newVal = newVal.substring(0, tmpPos - 1) + newVal.substring(tmpPos, newVal.length);
                // set new val
                $focused.val(newVal);
                setCaretToPos($focused[0], tmpPos - 1);
              }
            }
          }
          else
          {
            // if we are in another element not barcode and default is not exist
            var tmpPos = $focused[0].selectionStart;
            var newVal = $focused.val();
            newVal = newVal.substring(0, tmpPos - detectedCode.length) + newVal.substring(tmpPos, newVal.length);
            // set new val
            $focused.val(newVal);
            // set cursor to old location
            setCaretToPos($focused[0], tmpPos - detectedCode.length);
          }



          console.log('barcode: ' + detectedCode);
          $("body").trigger("barcode:detect", detectedCode);
        }
      }
      // on press enter empty used variables
      time    = 0;
      timeout = 0;
      keys    = '';
    }, 20);


    // check pressed key and do something on special conditon else add to pressed keys
    switch (_e.key)
    {
      // case 'Enter':
      case 'Control':
      case 'Shift':
      case 'CapsLock':
      case 'Tab':
      case 'Delete':
      case 'Backspace':
        // do nothing
        break;

      default:
        keys += _e.key;
        break;
    }

  });
})(window, jQuery);
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
    if($focused.is('.barcode2') && $focused.attr('data-lock') !== undefined)
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

        default:
          _e.preventDefault();
          break;
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
          // prevent default
          _e.preventDefault();
          $barcodeDefaultInput = $('.barcode2[data-default]');

          // get focused element and if we are in barcode fill it
          if($focused.is('.barcode2'))
          {
            // replace val in barcode field
            $focused.val(detectedCode);
            console.log(typeSpeed);
            // try to press enter, fail!
            // e = jQuery.Event("keypress")
            // e.which = 13 //choose the one you want
            // $(".barcode2#q").keypress(function(){  }).trigger(e);
          }
          else if($barcodeDefaultInput.length)
          {
            $barcodeDefaultInput.val(detectedCode);
            // you allow to press enter at the end of barcode, submit form if exist
            if($barcodeDefaultInput.attr('data-allowEnter') !== undefined)
            {
              $pForm = $barcodeDefaultInput.parents('form')
              if($pForm.length)
              {
                $pForm.submit();
              }
            }
          }
          else
          {
            console.log('barcode: ' + detectedCode);
          }

          $("body").trigger("barcode:detect", detectedCode);
        }
      }
      time    = 0;
      timeout = 0;
      keys    = '';
    }, 50);
    keys += _e.key;
  });
})(window, jQuery);
// Barcode khan

(function(root, $)
{
  root.barcodeOptions =
  {
    min: 5,
    max: 35,
    timeout: 5
  };

  var time = 0,
      keys = '';

  var timeout = 0;
  $(document.body).keydown(function(e)
  {
    if(timeout)
    {
      clearTimeout(timeout);
    }
    else
    {
      time = Date.now();
    }

    timeout = setTimeout(function()
    {
      var elapsed = Date.now() - time;
      var len = keys.length - 5;
      if(len/elapsed < barcodeOptions.timeout &&
         len > barcodeOptions.min &&
         len < barcodeOptions.max &&
         keys.slice(-5) === 'Enter')
      {
        var detectedCode = keys.slice(0, -5).toEnglish();
        detectedCode = detectedCode.toString();

        e.preventDefault();
        $focused = $(':focus');
        if($focused.is('.barcode'))
        {
          $focused.val(detectedCode);
        }
        $("body").trigger("barcode:detect", detectedCode);
      }
      time    = 0;
      timeout = 0;
      keys    = 0;
    }, 500);
    keys += e.key;
  });
})(window, jQuery);
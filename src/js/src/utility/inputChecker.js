

function inputChecker()
{
  // global val to abort requests
  var checkAjaxRequest = null;

  $(document).on('input', 'input[data-check]', function()
  {
    var iThis     = $(this);
    var iCheckURL = iThis.attr('data-check');
    iCheckURL     += '?' + iThis.attr('name') + '=' + $(this).val();
    checkAjaxRequest = jQuery.ajax(
    {
      type: 'GET',
      url: iCheckURL,
      beforeSend : function()
      {
          if(checkAjaxRequest != null)
          {
              checkAjaxRequest.abort();
          }
      },
      success: function(data)
      {
        notifGenerator(data, iThis.parent());
        // call custom fn if exist
        if(iThis.attr('data-check-fn'))
        {
          callFunc(iThis.attr('data-check-fn'));
        }
      }
    });
  });
};


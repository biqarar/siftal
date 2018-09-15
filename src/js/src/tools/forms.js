// Ajaxify: Ersale Form va Link ha ba estefade az AJAX
(function($)
{
  'use strict';

  var defaults =
  {
    ajax:
    {
      type: undefined,
      url: undefined,
      processData: false,
      contentType: false,
      dataType: 'json',
      cache: false,
      timeout: 10000,
      abort: false,
      async: true,
      beforeSend: function (request)
      {
        request.setRequestHeader("accept", "application/json");
      }
    },
    noLoading: false,
    lockForm: true,
  };
  var requests = [];

  $.fn.ajaxify = function Ajaxify(options)
  {
    var $form = $(this);
    $.extend(true, this, defaults, options);
    $form.trigger('ajaxify:init', this);
    var _super = this;

    // save focus position if wanna disable inputs
    if(_super.lockForm)
    {
      $(":focus").attr('data-hasFocus', true);
    }


    function send($this)
    {
      $form.trigger('ajaxify:send:before', _super);

      var elementOptions =
      {
        type: _super.link ? $this.attr('data-method') || 'get' : $this.prop('method') || $this.attr('data-method'),
        url: (_super.link ? $this.prop('href') : $this.prop('action')  || $this.attr('data-action')) || location.href
      };
      var ajax = _.extend(_super.ajax, elementOptions);

      var ajaxOptions;
      if(!_super.link)
      {
        // if we are in form use it, else use empty param
        if($this.is('form'))
        {
          // try to detect empty input file and disabled them because
          // we have problem on safari ajax request with erro 400!
          var $fileInputs = $('input[type="file"]:not([disabled])', $this)
          $fileInputs.each(function(a, myFileInput)
          {
            if (myFileInput.files.length > 0)
            {
              return;
            }
            $(myFileInput).prop('disabled', true);
          })

          var fd = new FormData($this.get(0));
          // change file disabled status to normal condition
          $fileInputs.prop('disabled', false)
        }
        else
        {
          var fd = new FormData();
        }

        $this.find('button[name][data-clicked]').each(function()
        {
          if(this.getAttribute('name'))
          {
            fd.append(this.getAttribute('name'), this.value);
          }
          $(this).prop('data-clicked', false);
        });

        // $this.find('[contenteditable]').each(function()
        // {
        //   fd.append(this.getAttribute('name'), this.innerHTML);
        // });
        for(var formName in ajax.data)
        {
          fd.append(formName, ajax.data[formName]);
        }
        ajaxOptions = _.extend(ajax,
        {
          data: fd
        });



        if(ajaxOptions.type === "get")
        {
          if($this.serialize())
          {
            Navigate(
            {
              url: ajaxOptions.url + '?' + $this.serialize()
            });
            return;
          }
        }

        if(_super.lockForm)
        {
          $this.find('input, button, textarea, [contenteditable], [data-ajaxify]').attr('disabled', '');
        }
      }
      else
      {
        try
        {
          var data = JSON.parse($this.attr('data-data'));
          ajaxOptions = _.extend(ajax,
          {
            data: data,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            processData: true
          });
        }
        catch(e)
        {
          ajaxOptions = ajax;
        }
        if(_super.lockForm)
        {
          $('[data-ajaxify]').attr('disabled', '');
        }
      }

      var refresh = ajaxOptions.refresh || $this.attr('data-refresh') !== undefined;
      var autoClose = ajaxOptions.autoClose || $this.attr('data-autoClose') !== undefined;

      if(!_super.noLoading)
      {
        $('body').addClass('loading-form');
        callFunc('loading_form', true);
      }


      $form.trigger('ajaxify:send:ajax:start', ajaxOptions);


      var myXhr = $.ajax(ajaxOptions)
      .done(function(data, status, xhr)
      {
        _super.results = data;

        $.fn.ajaxify.showResults(data, $this, _super);

        // if need to autoClose tab on some special condition, close windows
        if(autoClose)
        {
          var closeAfter = 0;
          if($this.attr('data-autoClose'))
          {
            closeAfter = $this.attr('data-autoClose');
          }
          notif('info', 'Auto close');
          setTimeout (function()
          {
            window.close();
          }, closeAfter);
        }
        // unlock form
        unlockForm(_super.lockForm);

        if(data && data.redirect)
        {
          var a = $('<a href="' + data.redirect + '"></a>');
          if(a.isAbsoluteURL() || data.direct)
          {
            location.replace(data.redirect);
          }
          else
          {
            Navigate({
              url: data.redirect
            });
          }
          return;
        }

        if(refresh)
        {
          Navigate({
            url: location.href,
            replace: true
          });
        }


        $form.trigger('ajaxify:success', data, status, xhr);
      })
      .fail(function(_result, _textStatus, _error)
      {
        if(_textStatus === 'timeout')
        {
          notif('fatal', 'Failed from timeout', 'Request failed', 5000, {'position':'topCenter', 'icon':'sf-hourglass-o'});
        }
        else
        {
          if(_result)
          {
            if(_result.responseJSON)
            {
              var notifResult = notifGenerator(_result.responseJSON);

              if(notifResult === false)
              {
                notif('fatal', 'Error in detect server result', 'Ajax is failed!');
              }
            }
            else
            {
              notif('fatal', 'Server result is empty', 'Ajax is failed!');

              if($('html').attr('data-debugger') !== undefined && _textStatus == 'error')
              {
                alert(JSON.stringify( _result ));
              }
            }
          }
          else
          {
            notif('fatal', 'No result from server', 'Ajax is failed!');
          }
        }


        $form.trigger('ajaxify:fail', _result, _textStatus, _error);
        unlockForm(_super.lockForm);
      })
      .always(function(a1, a2, a3)
      {
        $form.trigger('ajaxify:complete', a1, a2, a3);

        // if(_super.noLoading) return;
        // unlockForm(_super.lockForm);
        // use in fail and success seperately
        // because sometimes always is not called!
      });

      // logy(ajaxOptions.abort);
      if(ajaxOptions.abort)
      {
        requests.push(myXhr);
        for(var i = 0; i < requests.length-1; i++)
        {
          requests[i].abort();
        }
      }

    }

    send.call(_super, $form.first());
  };


  function unlockForm(_locked)
  {
    if(_locked)
    {
      $('input, button, textarea, [contenteditable], [data-ajaxify]').prop('disabled', false);
    }

   $('body').removeClass('loading-form');
    callFunc('loading_form', false);
  }


  $.fn.ajaxify.showResults = function(data, $form, _super)
  {
    $form.trigger('ajaxify:render:start', data, $form, _super);
    // try to show notif
    var notifResult = notifGenerator(data, $form);

    $form.trigger('ajaxify:render:done', data, $form, _super);

    if (!notifResult.error && $form.attr('data-clear') !== undefined)
    {
      $form.find('input, select, textarea, [contenteditable]').not('[data-unclear]').not('[type=checkbox]').val('');
    }

    $form.trigger('ajaxify:render:clear', data, $form, _super);

    if(!notifResult.error)
    {
      setTimeout(function()
      {
        if($form.find('input[data-get-focus]').get(0))
        {
          $form.find('input[data-get-focus]').get(0).select();
        }
        else if(_super.lockForm)
        {
          $('[data-hasFocus]').trigger("focus");
          $('[data-hasFocus]').attr('data-hasFocus', null);
        }
      }, 100);
    }

    $form.trigger('ajaxify:render:focus', data, $form, _super);

    // $form.trigger('ajaxify:notify', data, $form, _super);
  };
})(jQuery);


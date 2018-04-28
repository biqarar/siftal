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
          var fd = new FormData($this.get(0));
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
          $(this).removeAttr('data-clicked');
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
          $this.find('input, [contenteditable]').attr('disabled', '');
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
      .fail(function(xhr, status, error)
      {
        $form.trigger('ajaxify:fail', xhr, status, error);
      })
      .always(function(a1, a2, a3)
      {
        $form.trigger('ajaxify:complete', a1, a2, a3);

        // if(_super.noLoading) return;
        if(_super.lockForm)
        {
          $('input, [contenteditable], [data-ajaxify]').removeAttr('disabled');
        }

        $('body').removeClass('loading-form');
        callFunc('loading_form', false);
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

  $.fn.ajaxify.showResults = function(data, $form, _super)
  {
    $form.trigger('ajaxify:render:start', data, $form, _super);

    $form.find('input').removeClass('error warn');

    var hasError = false;

    for(var recordId in data.msg)
    {
      // get each record data
      var recordData     = data.msg[recordId];
      var recordDataMeta = recordData.meta;
      var recordTitle    = null;
      // get title if exist
      if(recordDataMeta && recordDataMeta.title)
      {
        recordTitle = recordDataMeta.title;
      }

      // generate new notif
      notif(recordData.type, recordData.text, recordTitle, $form.attr('data-delay'));

      // set flag of error
      if(recordData.type == 'error')
      {
          hasError = true;
      }
      // remove error sign of each element if exist
      $form.find('input').removeClass('error');

      // if want to do something with element, get it from result
      if(recordDataMeta && recordDataMeta.element)
      {
          try
          {
            recordDataMeta.element = JSON.parse(recordDataMeta.element);
          } catch(e) {}

          (_.isArray(recordDataMeta.element) ? recordDataMeta.element : [recordDataMeta.element]).forEach(function(_e)
          {
            var $el = $form.find('input[name="' + _e + '"]');
            if($el.length === 0)
            {
              $el = $form.find('select[name="' + _e + '"]');
            }
            if($el.length === 0)
            {
              $el = $form.find('textarea[name="' + _e + '"]');
            }

            $el.addClass('error');
          });
      }
    }

    $form.trigger('ajaxify:render:done', data, $form, _super);

    if (!hasError && $form.attr('data-clear') !== undefined)
    {
      $form.find('input, select, textarea, [contenteditable]').not('[data-unclear]').val('');
    }

    $form.trigger('ajaxify:render:clear', data, $form, _super);

    if(!hasError)
    {
      setTimeout(function()
      {
        if($form.find('input[data-get-focus]').get(0))
        {
          $form.find('input[data-get-focus]').get(0).select();
        }
        else if(_super.lockForm)
        {
          $('[data-hasFocus]').focus();
          $('[data-hasFocus]').attr('data-hasFocus', null);
        }
      }, 100);
    }

    $form.trigger('ajaxify:render:focus', data, $form, _super);

    // $form.trigger('ajaxify:notify', data, $form, _super);
  };
})(jQuery);


// Code haye moshtarak beine tamame safahat
// Az jomle meqdar dehi haye avvalie
// va etesale roydad haye mokhtalef

$(document).ready(function()
{
  // var regex = /(?:\?|&)?lang=\w*/g;
  // if(regex.test(location.search)) {
  //   Navigate({
  //     url: location.pathname + location.search.replace(regex, '') + location.hash,
  //     replace: true
  //   });
  // }

    /* Blur inputs with ESC key */
  $(document).keydown(function(e)
  {
      switch (e.keyCode)
      {
        case 13:
          // if we have enter on form elements, disallow to submit
          if($(":focus").parents('form').attr('disallowEnter') !== undefined)
          {
            // logy('You are not allow to submit form via keyboard enter');
            e.preventDefault();
          }
          break;


        case 27:
          $('input').blur();
          break;


        case 112:
          if(e.ctrlKey)
          {
            toggleLogy();
          }
          break;
      }
  });

  // Ajaxify links and forms
  $(document).on('submit', 'form', function(e)
  {
    // check old page has xhr and only if we have xhr try to change page
    if($('[data-xhr]').length === 0)
    {
      // if we dont have xhr on current page use hard change location
      return;
    }

    if($(this).hasAttr('data-action')) return;

    e.preventDefault();
    $(this).ajaxify();

  });

  $(document).on('click', '[data-ajaxify]', function(e)
  {
    if($(this).attr('data-continue') === undefined)
    {
      e.preventDefault();
    }
    // if need to run special function, run it
    if($(this).attr('data-fn') !== undefined)
    {
      callFunc($(this).attr('data-fn'), this);
    }
    // send as ajaxify
    $(this).ajaxify({link: true});
  });

  $(document).on('click', 'button[name]', function(e)
  {
      // $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
      $(this).attr("data-clicked", '');
  });


  // $(document).on('change', '#langlist', function() {
  //   var regex = /(?:\?|&)?lang=\w*/g;
  //   var srch = location.search.replace(regex, ''),
  //       url = location.pathname + (srch ? srch + '&' : '?') + 'lang='+this.value;

  //   location.replace(url);
  // });

  $(document).on('keypress','input[type="date"],\
    input[type="datetime-local"],\
    input[type="number"],\
    input[type="tel"],\
    input#mobile',
    function(e)
    {
      var disallowInput = false;

      // for input type number with max value
      // and
      if($(this).attr('type') === 'number' && $(this).attr('max') &&
          this.value.length >= $(this).attr('max').length && e.which !== 13)
      {
        disallowInput = true;
      }

      // if type persian key prevent default
      else if(e.which >= 1776 && e.which <= 1785)
      {
        // prevent default only if typed persian number
        e.preventDefault();
        // convert to english number
        var val = '';
        var key = String.fromCharCode(e.which);
        try
        {
          var start = this.selectionStart;
          var end   = this.selectionEnd;
          // on fa input start and end is null! simulate cursor at end of input
          if(start === null && end === null)
          {
            start = this.value.length;
            end   = this.value.length;
          }
          val = this.value.slice(0, start) + key.toEnglish() + this.value.slice(end);
        }
        catch(e)
        {
          val = this.value + key.toEnglish();
        }
        // set new value as val
        this.value = val;
        // need chage cursor position at future
        //
        //
      }
      else if(e.which >= 48 && e.which <= 57)
      {
        // do nothing, only accept numbers
      }
      else if(e.which == 46)
      {
        if(this.value.indexOf('.') >= 0 )
        {
          disallowInput = true;
        }
        // do nothing, only accept decimal seperator
        // check if we have one decimal dont accept another one!
      }
      else if (e.which === 0 || e.which === 8 || e.which === 13)
      {
        // accept system btn
      }
      // ctrl + a, ctrl + x, ctrl + c, ctrl + v
      else if (e.ctrlKey)
      {
        // accept system btn
      }
      else
      {
          disallowInput = true;
      }


      if(disallowInput)
      {
        // prevent default if press invalid char
        e.preventDefault();

        // show invalid class
        $this = $(this);
        $this.addClass('error');
        setTimeout(function()
        {
          $this.removeClass('error');
        }, 500);
        return false;
      }
    });



  // 'a:not([target="_blank"])\
  // :not([data-ajaxify])\
  // :not([data-action])\
  // :not([data-modal])',
  $(document.body).on('click', 'a', function(e)
  {
    var $this = $(this);

    // check old page has xhr and only if we have xhr try to change page
    if($('[data-xhr]').length === 0)
    {
      // if we dont have xhr on current page use hard change location
      return;
    }

    if(
        $this.attr('target') === '_blank' ||
        $this.hasAttr('data-ajaxify') ||
        $this.hasAttr('data-action') ||
        $this.hasAttr('data-direct') ||
        $this.hasAttr('data-modal') ||
        $this.isAbsoluteURL()
      )
      {
        return;
      }

    e.preventDefault();

    if(!$this.attr('href') || $this.attr('href').indexOf('#') > -1) return;

    var href = $this.attr('href');

    if(href.indexOf('lang=') > -1) return location.replace(href);

    Navigate({
      url: href,
      fake: !!$this.attr('data-fake')
    });
  });
});

// set scroll to top before unload
// $(window).on('beforeunload', function()
// {
//     $(window).scrollTop(0);
// });


route('*', function()
{
  // $('input').prop('lang', 'en');
  /* MODALS */

  // Things to do after closing/opening modal
  $('.modal', this).on('close', function(_e, _obj)
  {
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('noscroll');
    $('html,body').scrollTop(-scrollTop);

    var $this = $(this);

    $this.removeClass('visible');

    $.each($this.data(), function(key)
    {
      if(key === 'modal') return;
      $(this).removeAttr(key);
    });
  });


  $('.modal', this).on('open', function()
  {
    // fix scroll on opening modal
    if($(document).height() > $(window).height())
    {
      var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
      $('html').addClass('noscroll').css('top',-scrollTop);
    }

    $(this).addClass('visible');

    var $send = $('[data-ajaxify]', this);

    if (!$send.length) return;

    $.each($send.data(), function(key)
    {
      if(key === 'modal') return;

      $send.removeAttr(key);
    });

    $send.copyData(this, ['modal']);
  });


  $(".panel .panel-heading", this).click(
    function ()
    {
      var el = $(this).parent();
      if(el.hasClass('closed'))
      {
        el.children('.panel-footer').slideDown(300);
        el.children('.panel-body').slideDown(600, function(){
          el.removeClass('closed');
        });
        // el.children('.panel-body').fadeIn();
      }
      else
      {
        el.children('.panel-footer').slideUp(300);
        el.children('.panel-body').slideUp(500, function(){
          el.addClass('closed');
        });
        // el.children('.panel-body').hide();
      }
    }
  );


  // run watchScroll func to watch all elements
  watchScroll(this);

}).once(function(_module)
{
  // run only one time after changing url
  var hashtag     = $(window.location.hash);
  var hashtagFake = urlParam('hashtag')? $('#'+ urlParam('hashtag')): '';
  // handle scroll
  if(hashtag.length)
  {
    // after 0.5s of loading page scroll to specefic area if exist
    scrollSmooth(hashtag, null, 1000);
  }
  else if(hashtagFake.length)
  {
    scrollSmooth(hashtagFake, null, 1000);
  }
  else if(_module !== undefined)
  {
    findPushStateScroll();
  }

});

















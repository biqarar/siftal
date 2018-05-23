(function(e, t)
{
  $(document).ready(function()
  {
    $(document.body).click(function(e)
    {
      var $target = $(e.target);


      if(     $target.is('[data-modal]')
          ||  $target.parents('[data-modal]').length
          ||  $target.is('.modal-dialog')
          ||  $target.parents('.modal-dialog').length
          ||  $('.modal.visible').hasAttr('data-always')
        )
        {
          var myModal = $('.modal.visible');
          // if clicked on black box of always, then add focusing class
          if(myModal.hasAttr('data-always') && $target.is(myModal))
          {
            myModal.addClass('focusing');
            setTimeout(function()
            {
              myModal.removeClass('focusing');
            }, 300);

          }

          return;
        }
      closeModalTrigger('exit');
    });

    $(window).keydown(function(e)
    {
      if(e.which === 27)
      {
        closeModalTrigger('exit');
      }
    });

    // Open modals by clicking on elements with data-modal attribute
    $(document).on('click', '[data-modal]', function(e)
    {
      var $this = $(this);

      if($this.hasClass('modal') || $this.parents('.modal').length > 0) return;

      e.preventDefault();
      var $modal = $('#' + $this.attr('data-modal'));
      $modal.copyData($this, ['modal']);

      $modal.trigger('open', $this);
    });

    // Close modals and exit events
    $(document).on('click','[data-cancel]', function(e)
    {
      closeModalTrigger('cancel');
    });

    $(document).on('click', '[data-ok]', function(e)
    {
      closeModalTrigger('ok');
    });

    function closeModalTrigger(_type)
    {
      if($('.modal.visible').length)
      {
        // close with specefic type
        $('.modal').trigger('close');
        // if has specefic type, run trigger of it
        if(_type)
        {
          $('.modal').trigger(_type);
        }
      }
    }

  });
})(this);


function modalOpenClose()
{
  /* MODALS */
  // Things to do after closing/opening modal
  $('.modal').on('close', function(_e, _obj)
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


  $('.modal').on('open', function()
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

}



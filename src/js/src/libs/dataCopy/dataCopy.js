
function dataCopy()
{
  $('[data-copy]').off('click');
  $('[data-copy]').on('click', function()
  {
    var $this = $(this);
    var targetEl = $($this.attr('data-copy'));
    if(targetEl.length)
    {
      // targetEl.attr('disabled', null);

      if (navigator.userAgent.match(/ipad|ipod|iphone/i))
      {
        var el = targetEl.get(0);
        var editable = el.contentEditable;
        var readOnly = el.readOnly;
        el.contentEditable = true;
        el.readOnly = false;
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        el.setSelectionRange(0, 999999);
        el.contentEditable = editable;
        el.readOnly = readOnly;
      }
      else
      {
        targetEl.select();
      }

      try
      {
        // copy to clipboard
        document.execCommand('copy');
        targetEl.blur();

        // copied animation
        $this.addClass('copied');
        setTimeout(function() { $this.removeClass('copied'); }, 300);
      }
      catch (err)
      {
        console.log('cant copy! Ctrl/Cmd+C to copy')
      }
    }
  })
}



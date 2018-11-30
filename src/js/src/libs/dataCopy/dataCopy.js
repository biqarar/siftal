
function dataCopy()
{
  $('[data-copy]').off('click');
  $('[data-copy]').on('click', function()
  {
    var $this = $(this);
    var targetEl = $($this.attr('data-copy'));
    if(targetEl.length)
    {
      targetEl.attr('disabled', null);
      targetEl.select();
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



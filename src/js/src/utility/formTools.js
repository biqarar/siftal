function formToolsRunner()
{
  rangeSlider1();
  toggleRadio();
}

var rangeSlider1 = function()
{
  var mySlider = $('.rangeSlider1');
  if(mySlider.length < 1)
  {
    return;
  }
  var range  = $('.rangeSlider1 input');
  var value  = $('.rangeSlider1 output');

  mySlider.each(function()
  {
    value.each(function()
    {
      var value = $(this).prev().attr('value');
      console.log(value);
      if(!value)
      {
        value = '-';
      }
      $(this).html(value);
    });

    range.on('input', function()
    {
      $(this).next(value).html(this.value);
    });
  });
};


function toggleRadio()
{
  $('.togglable input[type=radio]').on("click", function(event)
  {
    var $thisRadio = $(this);

    if($thisRadio.prop('checked-toggle'))
    {
      $thisRadio.prop('checked', false);
      $thisRadio.prop('checked-toggle', false);
    }
    else
    {
      $thisRadio.prop('checked-toggle', true);
      setTimeout(function()
      {
        $thisRadio.prop('checked-toggle', false);
      }, 1000)
    }
  });
}

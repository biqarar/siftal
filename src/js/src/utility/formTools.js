var rangeSlider1 = function()
{
  var slider = $('.rangeSlider1');
  var range  = $('.rangeSlider1 input');
  var value  = $('.rangeSlider1 output');

  slider.each(function()
  {
    value.each(function()
    {
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function()
    {
      $(this).next(value).html(this.value);
    });
  });
};

rangeSlider1();

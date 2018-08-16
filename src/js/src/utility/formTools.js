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
  $('.radio-button').on("click", function(event){
    $('.radio-button').prop('checked', false);
    $(this).prop('checked', true);
  });
}

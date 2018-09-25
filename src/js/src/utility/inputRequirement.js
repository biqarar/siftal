

function inputRequirement()
{
  $(document).on('mouseenter mouseleave', 'form .btn', function()
  {
    myForm      = $(this).parents('form');
    myEmptyVals = myForm.find('input[required]:empty');
    myEmptyVals.addClass('requirement');

  // remove requirement class after delay
    setTimeout(function() {
      myEmptyVals.removeClass('requirement');
  	}, 1000);
  });

};


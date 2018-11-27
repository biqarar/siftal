

function inputRequirement()
{
  $(document).on('mouseenter mouseleave', 'form button.btn', function()
  {
    myForm      = $(this).parents('form');
    myEmptyVals = myForm.find('input[required]').filter(function() { return !$(this).val().trim().length })

    myEmptyVals.addClass('requirement');

  // remove requirement class after delay
    setTimeout(function() {
      myEmptyVals.removeClass('requirement');
  	}, 1000);
  });

};


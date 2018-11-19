

function tbl1Openable()
{
  $(document).on('click', '.tbl1.openable tbody tr', function(_e)
  {
  	if($(_e.target).is('a, a *'))
  	{
  		// on click on links skip
  	}
  	else
  	{
    	$(this).toggleClass('open');
  	}
  });
}


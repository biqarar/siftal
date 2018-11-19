

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
      var $row = $(this);
      if($row.attr('data-open') !== undefined)
      {
        $row.attr('data-open', null);
        $row.find('[data-openable-close]').slideDown('100');
        $row.find('[data-openable-open]').slideUp('300');
      }
      else
      {
        $row.attr('data-open', '');
        $row.find('[data-openable-close]').slideUp('100');
        $row.find('[data-openable-open]').slideDown('300');
      }
  	}
  });
}


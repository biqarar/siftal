

function tbl1Openable()
{
  $(document).on('click', '.tbl1.openable tbody tr', function(e)
  {
    $(this).toggleClass('open');
  });
}


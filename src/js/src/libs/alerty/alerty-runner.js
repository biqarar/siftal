
if($('html').attr('lang') === 'fa')
{
  say = alerty.mixin(
  {
    heightAuto: false,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    closeButtonAriaLabel: 'بستن  پنجره'
  });
}
else
{
  say = alerty.mixin(
  {
    heightAuto: false
  });
}


function deleteConfirmer()
{
  // const sayWithBootstrapButtons = say.mixin({
  //   confirmButtonClass: 'btn btn-success',
  //   cancelButtonClass: 'btn btn-danger',
  //   buttonsStyling: false,
  // })

  say({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    reverseButtons: true
  }).then((result) =>
  {
    if (result.value)
    {
      say(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
    else if (result.dismiss === alerty.DismissReason.cancel)
    {
      // say(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // )
    }
  });
}

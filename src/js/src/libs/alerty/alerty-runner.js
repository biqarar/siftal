
if($('html').attr('lang') === 'fa')
{
  say = alerty.mixin({
    heightAuto: false,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    closeButtonAriaLabel: 'بستن  پنجره'
  });
}
else
{
    say = alerty.mixin({
    heightAuto: false
  });
}



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


function deleteConfirmer(_this)
{
  _data  = null;
  _title = null
  _text  = null;
  if(_this !== undefined && _this)
  {
    _data  = _this.attr('data-data');
    _title = _this.attr('data-title');
    _text  = _this.attr('data-msg');
  }
  var myLang = $('html').attr('lang') === 'fa';

  if(_data === undefined)
  {
    logy('data not sended!');
    // return false;
  }

  if(!_title)
  {
    if(myLang === 'fa')
    {
      _title = 'آیا تایید می‌کنید؟';
    }
    else
    {
      _title = 'Do you confirm?';
    }
  }
  if(!_text)
  {
    _text = '';
  }


  say({
    title: _title,
    text: _text,
    type: 'warning',
    focusConfirm: false,
    showCancelButton: true,
    reverseButtons: true
  }).then((result) =>
  {
    if (result.value)
    {
      // send ajax request if elemet is exist
      if(_this)
      {
        console.log(_this);
        _this.ajaxify({link: true, type: 'post'});
      }
      say(
      {
        type: 'success',
        title: 'Deleted request sended',
        showConfirmButton: false,
        timer: 1000
      });
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




/**
 * run date picker for all elements in page
 * @return {[type]} [description]
 */
function runDatePicker()
{
  $('.datepicker').each(function()
  {
    var $mydatePicker      = $(this);
    var mydateOpt          = {};
    // default format for current selector
    mydateOpt.format       = $mydatePicker.attr('data-format');
    // connect to another field
    if($mydatePicker.attr('data-alt'))
    {
      mydateOpt.altField   = $mydatePicker.attr('data-alt');
      mydateOpt.altFormat  = $mydatePicker.attr('data-altFormat');
    }
    // allow to set view mode
    if($mydatePicker.attr('data-view'))
    {
      // allow to change view mode
      mydateOpt.viewMode   = $mydatePicker.attr('data-view');
    }
    // show inline mode
    mydateOpt.inline       = $mydatePicker.attr('data-inline') !== undefined? true: false;

    // set some setting on as default like below settings
    // sensetive about input and read changes!
    mydateOpt.observer     = $mydatePicker.attr('data-off') !== undefined? false: true;
    // auto close after chose date
    mydateOpt.autoClose    = $mydatePicker.attr('data-open') !== undefined? false: true;
    // use persian digit
    mydateOpt.persianDigit = $mydatePicker.attr('data-en') !== undefined? false: true;
    mydateOpt.initialValue = $mydatePicker.attr('data-initialValue') !== undefined? false: true;

    if(mydateOpt.inline)
    {
      mydateOpt.autoClose = false;
    }

    // check min value
    if($mydatePicker.attr('data-min') !== undefined)
    {
      if($mydatePicker.attr('data-min') === 'now')
      {
        mydateOpt.minDate = new persianDate().unix();
      }
    }

    // check max value
    if($mydatePicker.attr('data-max') !== undefined)
    {
      if($mydatePicker.attr('data-max') === 'now')
      {
        mydateOpt.maxDate = new persianDate().unix();
      }
    }

    // console.log(mydateOpt);
    $mydatePicker.persianDatepicker(mydateOpt);
  });
}


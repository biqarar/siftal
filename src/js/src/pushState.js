// on start
function pushStateSiftal(_direct)
{
  // run modal
  modalOpenClose();
  runDataResponse();
  runInputFileFunc();
  responsiveSidebar();
  setLanguageURL(_direct);
  runSortable();
  // run clockpickers
  runClockPicker();
  // run counter up on each page we have counter
  runCounterUp();
  // run notif from html
  runHtmlNotif();
  // run datepicker
  runDatePicker();
  // check here links
  weAreHereChecker();
  // detect id and try to scroll to it
  scrollSmoothDetector(_direct);
  // run watchScroll func to watch all elements
  watchScroll();
  runTippy();
  initTagDetector();
  bindUploader();
  dropdownRunner();

  if($('body').hasClass('enter'))
  {
    handleEnterEvents();
  }
  callFunc('pushState', _direct);
  callFunc('pushStateFinal', _direct);
  callFunc('chartDrawer', _direct);
}


// run for the first time
$(document).ready(function()
{
  pushStateSiftal(true);

  // call some static function without need to run with pushState
  inputChecker();
});



function beforePushStateSiftal()
{
  removeTippy();
  callFunc('removeAmcharts4');

}


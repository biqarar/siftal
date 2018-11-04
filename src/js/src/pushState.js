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
  // run form tools
  formToolsRunner();
  runTippy();
  initTagDetector();
  bindUploader();
  dropdownRunner();
  // check navigate is done or not
  navigateChecker();
  // check autoPrint detection
  autoPrint();


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
  // check requirements of form and highlight them
  inputRequirement();
  // do something before unload page
  catchBeforeUnload();
  // run cloner
  cloner();
  pingiRunner();
  // check autoPrint detection
  autoPrint();
});



function beforePushStateSiftal()
{
  removeTippy();
  callFunc('removeAmcharts4');

}


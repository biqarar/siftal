// on start
route('*', function ()
{


}).once(function()
{
  // run modal
  modalOpenClose();
  runDataResponse();
  runInputFileFunc();
  responsiveSidebar();
  setLanguageURL();
  runCropper();
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
  // run autoList
  fillAuto();
  // detect id and try to scroll to it
  scrollSmoothDetector();
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
});



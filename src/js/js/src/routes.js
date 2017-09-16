// on start
route('*', function ()
{


}).once(function()
{

  runDataResponse();
  runInputFileFunc();
  responsiveSidebar();
  setLanguageURL();
  runCropper();
  runSortable();
  // run counter up on each page we have counter
  runCounterUp();

});



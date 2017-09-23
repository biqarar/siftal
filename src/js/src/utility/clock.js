// run on page start
clockHMRunner();


function clockHMRunner()
{
  var myClockTime  = $('.clock .time');
  var fnClockUpdater = (function()
  {
    var clockNowHTML = clockNow('HtmlHMFit');
    if(myClockTime.html() !== clockNowHTML)
    {
      myClockTime.html(clockNow('HtmlHMFit'));
    }
  });
  fnClockUpdater();
  setInterval(fnClockUpdater, 1000* 10);
}

/**
 * retun clock in seperated value
 * @return {[type]} [description]
 */
function clockNow(_return)
{
  var clock        = {};
  clock.time       = new Date();
  clock.hour       = clock.time.getHours();
  clock.minute     = clock.time.getMinutes();
  clock.second     = clock.time.getSeconds();

  clock.HtmlHour   = '<span class="hour">' + addZero(clock.hour) + '</span>';
  clock.HtmlMinute = '<span class="minute">' + addZero(clock.minute) + '</span>';
  clock.HtmlSecond = '<span class="second">' + addZero(clock.second) + '</span>';
  clock.Html       = clock.HtmlHour + ':' + clock.HtmlMinute + ':' + clock.HtmlSecond;
  clock.HtmlFit    = fitNumber(clock.Html, false);
  clock.HtmlHM     = clock.HtmlHour + ':' + clock.HtmlMinute
  clock.HtmlHMFit  = fitNumber(clock.HtmlHM, false);

  // return specefic value
  if(_return)
  {
    return clock[_return];
  }
  return clock;
}

function addZero(i)
{
  if (i < 10)
  {
    i = "0" + i
  };
  return i;
}


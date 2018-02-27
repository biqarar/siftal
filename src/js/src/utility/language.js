
/**
 * set link of language on each page
 */
function setLanguageURL()
{
  if($('.langlist a').length < 1)
  {
    return;
  }
  var urlPath     = window.location.pathname;
  var urlHash     = window.location.hash;
  var urlSearch   = window.location.search;
  var indexOfLang = urlPath.indexOf('/' + $('html').attr('lang'));
  var urlBase     = $('base').attr('href');
  if(urlBase)
  {
    urlBase = urlBase.substr(0, urlBase.indexOf('/', 9));
  }

  if(indexOfLang === 0)
  {
    urlPath = urlPath.substr(4);
  }
  else
  {
    urlPath = urlPath.substr(1);
  }

  $('.langlist a').each(function(key, index)
  {
    var lang = $(index).attr('hreflang');
    // if we are in this language
    if(lang == $('html').attr('lang'))
    {
      $(index).attr('class', 'isActive');
    }
    // if(lang == 'en')
    // {
    //   lang = '';
    // }
    // else
    if(lang == $('html').attr('lang'))
    {
      // lang = '/' + lang;
    }
    var myUrl = urlPath;
    if(lang)
    {
      myUrl = lang + '/' + myUrl;
    }
    // add hash if exist
    if(urlHash)
    {
      myUrl += urlHash;
    }
    myUrl = urlBase + '/' + myUrl;
    // remove last slash if exist
    if (myUrl.charAt(myUrl.length - 1) == '/')
    {
      myUrl = myUrl.substr(0, myUrl.length - 1);
    }
    if(urlSearch)
    {
      myUrl = myUrl . urlSearch;
    }

    $(index).attr('href', myUrl);
  })
}


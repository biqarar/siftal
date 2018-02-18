

/**
 * [isActiveChecker description]
 * @return {[type]} [description]
 */
function weAreHereChecker()
{
  var pathLoc     = document.location.pathname;
  var fullLoc     = document.location.href;
  var ListHere    = $('body [href="' + fullLoc + '"]');

  var fullLocDir  = document.location.protocol +"//"+ document.location.hostname + pathLoc;
  var ListHereDir = $('body [href="' + pathLoc + '"], body [href="' + fullLocDir + '"]');

  // var ListHere;

  // // remove last slash
  // var to = pathLoc.lastIndexOf('/');
  // if(to)
  // {
  //   to            = to == -1 ? pathLoc.length : to;
  //   pathLoc       = pathLoc.substring(0, to);
  //   fullLoc       = document.location.protocol +"//"+ document.location.hostname + pathLoc;
  //   var ListHere = $('body [href$="' + pathLoc + '"], body [href$="' + fullLoc + '"]');
  // }



  // fix class of here
  $('.weAreHere').removeClass('weAreHere');
  ListHere.addClass('weAreHere');

  $('.weAreHereDir').removeClass('weAreHereDir');
  ListHereDir.addClass('weAreHereDir');

  // fix class of parents


}




/**
 * [isActiveChecker description]
 * @return {[type]} [description]
 */
function weAreHereChecker()
{
  var pathLoc       = document.location.pathname;
  var fullLoc       = document.location.protocol +"//"+ document.location.hostname + pathLoc;

  var ListHere = $('body [href="' + pathLoc + '"], body [href="' + fullLoc + '"]');
  var ListHere;

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

  // fix class of parents


}


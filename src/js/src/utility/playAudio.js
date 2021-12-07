

function playAudio(_url, _absolute)
{
  if(_absolute === undefined)
  {
    _url = urlJibres('cdn') + 'sounds/' + _url;
  }

  var audio = new Audio(_url);
  audio.play();
}


//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(_fileName, duration, frequency, volume, type, callback)
{
  //if you have another AudioContext class use that one, as some browsers have a limit
  try
  {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
  }
  catch(err)
  {
    logy(err.message);
  }
  if(audioCtx)
  {
    var oscillator = audioCtx.createOscillator();
    var gainNode   = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume){gainNode.gain.value           = volume;};
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type                 = type;}
    if (callback){oscillator.onended          = callback;}

    oscillator.start();
    setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
  }
  else
  {
    logy('close some tabs!');
  }

  playAudio(_fileName);

  // try to create sys beep
  sysBeep();
};

function sysBeep()
{
  logy('\u0007');
}

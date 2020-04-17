
carrier_freq = 21000;
spect_radius = 1000;


(function(window, document, undefined) {
  function gotStream(stream) {
    if (typeof AudioContext !== "undefined") {
      context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
      context = new webkitAudioContext();
    } else if (typeof mozAudioContext !== "undefined") {
      context = new mozAudioContext();
  } else {
  }

    streamSource = context.createMediaStreamSource(stream);

    var waterfall = Waterfall({
      stream: streamSource,
      context: context,
      // audiofile: './audio/sweep18.5k.wav'
      audiofile: './audio/stereochirp.wav'
      // audiofile: './audio/440.wav'
    });

    window.waterfall = waterfall;
    document.getElementById('tonetest').addEventListener("click", function(){
      // waterfall.sequence(seq);
      waterfall.play();
    });

    document.getElementById('tonetest_stop').addEventListener("click", function(){
      waterfall.stop();
    });

  }

  function handleError(err) {
    console.log("An error occurred: " + err);
  }

  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getMedia({ audio: true }, gotStream, handleError);
}(window, document));

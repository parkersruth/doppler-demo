
center_freq = 21000;
spect_radius = 1000;

audiofile = './audio/chirp.wav';

(function(window, document, undefined) {
  function gotStream(stream) {
    if (typeof AudioContext !== "undefined") {
      window.context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
      window.context = new webkitAudioContext();
    } else if (typeof mozAudioContext !== "undefined") {
      window.context = new mozAudioContext();
  } else {
  }

    streamSource = context.createMediaStreamSource(stream);

    // tone generation and FFT visualization
    var waterfall = Waterfall({
      stream: streamSource,
      context: context,
    });
    window.waterfall = waterfall;

  }

  function handleError(err) {
    console.log("An error occurred: " + err);
  }

  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getMedia({ audio: true }, gotStream, handleError);
}(window, document));

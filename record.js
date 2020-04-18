/*
Record audio from the browser using streams and promises
*/

//name of file in the server to which data will be written
var dir = "./data/";
var fname = "temp";

const freq = 20000;
const volume = 0.5;
const type = 'sine';

const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
var osc;

let recorder = null;
const actionButton = document.getElementById('record');
let audio = null;

const startRecord = async() => {
    var start_time = new Date();
    var timestamp = start_time.getFullYear() + "_" + start_time.getMonth() + "_" + start_time.getDate() + "_" + start_time.getHours() + "_" + start_time.getMinutes() + "_" + start_time.getSeconds();

    faudio = timestamp + "_audio.wav";
    fnotes = timestamp + "_audioNotes.json";

    //play tone
    osc = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = volume;
    osc.frequency.value = freq;
    osc.type = type;

    if (osc.noteOn) osc.noteOn(0); //old browsers
    if (osc.start) osc.start(); //new browsers

    recorder = await recordAudio();
    recorder.start();

    //disable and enable buttons
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
};
const stopRecord = async () => {
    if (recorder) {
        audio = await recorder.stop();

        //stop tone
        if (osc.noteOff) osc.noteOff(0); //old browsers
        if (osc.stop) osc.stop(); //new browsers

        recorder = null;

        //disable and enable buttons
        document.getElementById("stop").disabled = true;
        document.getElementById("start").disabled = false;
    }
};

//play back audio in the browser to test whether it has recorded
const playAudio = async () => {
    if (audio && typeof audio.play === "function") audio.play();
};

//store audio file and corresponding notes file to the server
const saveAudio = async () => {
    if (audio) {
      var reader = new FileReader();
	  reader.addEventListener("loadend", function() {
		  var dv = new DataView(reader.result);
		  document.getElementById("dv").innerHTML = ("data view size " + dv.byteLength);
	  });
	  var text = reader.readAsArrayBuffer(audio['audioBlob']);


      console.log("records.js audio: " + audio);
      send_audio(dir+fname, audio);

      var notes = {patient: document.getElementById('person').value,
                   exerciseName: document.getElementById('exerciseName').value,
                   repetitions: document.getElementById('repetitions').value,
                   phoneLocation: document.getElementById('phoneLocation').value,
                   phoneModel: document.getElementById('phoneModel').value,
                   location: document.getElementById('location').value,
                   comments: document.getElementById('comments').value};

      file_write(dir+fnotes, JSON.stringify(notes));
    }
};

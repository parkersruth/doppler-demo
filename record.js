/*
Record audio from the browser using streams and promises
*/

//name of file in the server to which data will be written
var dir = "./data/";
var fname = "temp";

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

let recorder = null;
let audiodat = null;

const startRecord = async() => {
    var start_time = new Date();
    var timestamp = start_time.getFullYear() + "_" + start_time.getMonth() + "_" + start_time.getDate() + "_" + start_time.getHours() + "_" + start_time.getMinutes() + "_" + start_time.getSeconds();

    //play tone

    // TODO play tone here

    recorder = await recordAudio();
    recorder.start();

    //disable and enable buttons
    // document.getElementById("start").disabled = true;
    // document.getElementById("stop").disabled = false;
};
const stopRecord = async () => {
    if (recorder) {
        audiodata = await recorder.stop();

        recorder = null;
        console.log('in stopRecord, audiodata = ' + audiodata);

        document.getElementById('savebtn').disabled = false;
    }
};

//play back audio in the browser to test whether it has recorded
// const playAudio = async () => {
//     if (audiodata && typeof audiodata.play === "function") audiodata.play();
// };


// const saveAudio = async () => {
//   if (audiodata) {
//     var reader = new FileReader();
//     reader.addEventListener("loadend", function() {
//       var dv = new DataView(reader.result);
//       document.getElementById("dv").innerHTML = ("data view size " + dv.byteLength);
//     });
//     var text = reader.readAsArrayBuffer(audiodata['audioBlob']);
//
//
//     console.log("records.js audiodata: " + audiodata);
//     send_audio(dir+fname, audiodata);
//
//     // var notes = {patient: document.getElementById('person').value,
//     //               exerciseName: document.getElementById('exerciseName').value,
//     //               repetitions: document.getElementById('repetitions').value,
//     //               phoneLocation: document.getElementById('phoneLocation').value,
//     //               phoneModel: document.getElementById('phoneModel').value,
//     //               location: document.getElementById('location').value,
//     //               comments: document.getElementById('comments').value};
//     //
//     // file_write(dir+fnotes, JSON.stringify(notes));
//   }
// };


//store audio file and corresponding notes file to the server
const saveAudio = async () => {
  console.log("in saveAudio, audiodata = " + audiodata);
  send_audio(dir+fname, audiodata);
};

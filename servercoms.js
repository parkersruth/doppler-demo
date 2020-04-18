/*
Client side code for server communication
*/

// write the contents to the given relative filename on the server
function file_write(filename, content, append=true, callback=null) {
  $.ajax({
    type: 'POST',
    url: 'file_write.php',
    data: {file: filename, content: content, append:append},
    success: callback
  });
}

// read the data from the given file
function file_read(file, callback=null) {
  $.ajax({
    url: file,
    success: callback
  });
}

// send an email with the given fields
function mail(to, bcc, from, replyto, subject, message, callback=null) {
  $.ajax({
    type: 'POST',
    url: 'mail.php',
    data: {to: to, bcc: bcc, replyto: replyto, from: from, subject: subject, message: message},
    callback: callback
  });
}

// store an audio blob as a .wav file in the server
function send_audio(fn, blob){

  var formData = new FormData();

  formData.append("filename", fn);
  formData.append('audio', blob);
  $.ajax({
    url:'save_audio.php',
    type:'post',
    data: formData,
    contentType:false,
    processData:false,
    cache:false,
    success: function(data){
      console.log("send_audio success!");
      console.log("file name " + fn);
      console.log(data);
    }
  });
}

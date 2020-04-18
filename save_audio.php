<?php
/*
Backend code to write to the Attu server 
*/

$input = $_FILES['audio']['tmp_name']; //audio blob

$output = $_POST['filename']; //name of the file in which audio will be stored in the server, 
                                     //client determines file name

if(move_uploaded_file($input, $output))
    exit('Audio file Uploaded');

/*Display the file array if upload failed*/
exit(print_r($_FILES));

?>

<?php

$to = $_POST['to'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$from = $_POST['from'];
$bcc = $_POST['bcc'];
$replyto = $_POST['replyto'];
$headers = "From: " . $from . "\r\n" .
  "Reply-To: " . $replyto . "\r\n" .
  "BCC: " . $bcc . "\r\n" .
  "Content-Type: text/html; charset=ISO-8859-1\r\n" ;
mail($to,$subject,$message,$headers);

?>

<?php

$file = $_POST['file'];
$contents = $_POST['content'];
$write_mode = ($_POST['append'] == true ? FILE_APPEND | LOCK_EX : LOCK_EX);
file_put_contents($file, $contents, $write_mode);

?>


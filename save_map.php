<?php
$path = 'usermaps.js';
$fh = fopen($path, "a+");
$mapstr = $_POST['data_map']; //get input text
fwrite($fh, $mapstr); // Write information to the file
fclose($fh); // Close the file
?>

<?php
if(!empty($_POST['data'])){
    $data = $_POST['data'];
    $fname = "usermaps.js";
    $file = fopen($fname, 'a');//creates new file
    fwrite($file, $data);
    fclose($file);
}
?>

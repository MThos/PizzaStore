<?php
/*
 * @program:	    pizzaOptions.php
 * @description:  check which options were chosen and set sessions
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$error = array();
$status = array();

// size validation
if (isset($_POST['size'])) {
  $_SESSION['size'] = $_POST['size'];
}
else {
  $error[] = "You need to pick a size";
}

// dough validation
if (isset($_POST['dough'])) {
  $_SESSION['dough'] = $_POST['dough'];
}
else {
  $error[] = "You need to pick a dough";
}

// sauce validation
if (isset($_POST['sauce'])) {
  $_SESSION['sauce'] = $_POST['sauce'];
}
else {
  $error[] = "You need to pick a sauce";
}

// cheese validation
if (isset($_POST['cheese'])) {
  $_SESSION['cheese'] = $_POST['cheese'];
}
else {
  $error[] = "You need to pick a cheese";
}

// check if no errors and send json back to client
if (count($error) === 0) {
  $status[] = "ok";
  echo json_encode($status);
}
else {
  $status[] = "error";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}

?>

<?php
/*
 * @program:	    pizzaToppings.php
 * @description:  check which toppings were chosen and set sessions
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$error = array();
$status = array();

// topping validation
if (!isset($_POST['topping'])) {
  $status[] = "error";
  $error[] = "You need to pick at least 1 topping";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}
else if (count($_POST['topping']) > 2 && $_SESSION['size'] === "small") {
  $status[] = "error";
  $error[] = "A small pizza can only have up to 2 toppings";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}
else if (count($_POST['topping']) > 5 && $_SESSION['size'] === "medium") {
  $status[] = "error";
  $error[] = "A medium pizza can only have up to 5 toppings";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}
else if (count($_POST['topping']) > 7) {
  $status[] = "error";
  $error[] = "You cannot pick more than 7 toppings";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}
else {
  // check if no errors and send json back to client
  $_SESSION['topping'] = $_POST['topping'];
  $status[] = "ok";
  $status['options'] = array();
  $status['toppings'] = array();
  array_push($status['options'], $_SESSION['size']);
  array_push($status['options'], $_SESSION['dough']);
  array_push($status['options'], $_SESSION['sauce']);
  array_push($status['options'], $_SESSION['cheese']);
  foreach ($_SESSION['topping'] as $topping) {
    array_push($status['toppings'], $topping);
  }
  echo json_encode($status);
}

?>

<?php
/*
 * @program:	    orderSummary.php
 * @description:  grab all session data to display a finalization summary
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$status = array();
$status['options'] = array();
$status['toppings'] = array();
$status['address'] = array();

// return status 'ok' for ajax.js
$status[] = "ok";
// push session data to client for displaying information
array_push($status['options'], $_SESSION['size']);
array_push($status['options'], $_SESSION['dough']);
array_push($status['options'], $_SESSION['sauce']);
array_push($status['options'], $_SESSION['cheese']);
foreach ($_SESSION['topping'] as $topping) {
  array_push($status['toppings'], $topping);
}
foreach ($_SESSION['address'] as $address) {
  array_push($status['address'], $address);
}
echo json_encode($status);

?>

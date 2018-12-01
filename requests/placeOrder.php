<?php
/*
 * @program:	  placeOrder.php
 * @description:  add order to the database and generate order number
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	  v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$db_conn = connect_db();
$status = array();
$status['order'] = array();
$cust_id = (int)$_SESSION['id']; // convert 'id' to int for db
$order_time = date("Y-m-d H:i:s"); // current date and time
$order_no = rand(10000, 100000); // random order number
$price = 20.00;

// run the prepared statement and send the json back to client
save_order($db_conn, $cust_id, $order_no, $order_time, $price);
$status[] = "ok";
array_push($status['order'], $order_no);
echo json_encode($status);

/*
* @function:       save_order()
* @description:    inserts new order into database using customer id
* @param:          $db_conn, $cust_id, $order_no, $order_time, $price
* @returns:        none
*/
function save_order($db_conn, $cust_id, $order_no, $order_time, $price) {
  // insert order -> prepared statement
  $insert_order = $db_conn->prepare("insert into orders (cust_id, order_no, order_time, price) values (?, ?, ?, ?)");
  $insert_order->bind_param("iisd", $cust_id, $order_no, $order_time, $price);
  $insert_order->execute();
}

function connect_db() {
  $db_conn = new mysqli('localhost', 'admin', 'admin', 'pizza_store');
  if ($db_conn->connect_errno) {
    printf ("Could not connect to database server\n Error: "
        .$db_conn->connect_errno ."\n Report: "
        .$db_conn->connect_error."\n");
    die;
  }
  return $db_conn;
}

function disconnect_db($db_conn) {
  $db_conn->close();
}

disconnect_db($db_conn);

?>

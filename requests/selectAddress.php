<?php
/*
 * @program:	    selectAddress.php
 * @description:  grab current user addresses from database for selection
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$db_conn = connect_db();
$error = array();
$status = array();

// address validation
if (isset($_POST['address'])) {
  $id = $_POST['address']; // get address from radio button id
  $qry = "SELECT street_address, city, province, postal_code, phone_no FROM address WHERE id = $id;";
  $rs = $db_conn->query($qry);
  if ($rs->num_rows > 0) {  
    $customer = array();
    while ($row = $rs->fetch_assoc()) {
      $_SESSION['address'] = $row; // set session for future use
    }
    // if status 'ok' send json back to client
    $status[] = "ok";
    echo json_encode($status);
  }
}
else {
  $error[] = "You need to pick an address";
  $status[] = "error";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
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

<?php
/*
 * @program:	  userExists.php
 * @description:  get the user information from database if exists
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	  v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$db_conn = connect_db();
$id = $_GET['id'];

// select address with user id, pulled from client with get()
select_addresses($db_conn, $id);

/*
* @function:       select_addresses()
* @description:    selects the addresses in db  of user id passed from get()
* @param:          $db_conn, $id
* @returns:        none
*/
function select_addresses($db_conn, $id) {
  // left join the customer and address tables on id/cust id fields
  $qry = "SELECT fullname, email, address.id, street_address, city, province, postal_code, phone_no FROM customer LEFT JOIN address ON customer.id = address.cust_id WHERE customer.id = $id;";
  $rs = $db_conn->query($qry);
  if ($rs->num_rows > 0) {
    $customer['address'] = array();
    while ($row = $rs->fetch_assoc()) {
      array_push($customer['address'], $row); // populate address
    }
    // send the json 'address' back to client
    echo json_encode($customer);
  }
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

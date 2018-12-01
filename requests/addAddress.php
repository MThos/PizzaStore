<?php
/*
 * @program:	    addAddress.php
 * @description:  Add additional address to database for user
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
$id = $_SESSION['id'];
$phone = null;
$address = null;
$city = null;
$province = null;
$postalcode = null;
$suite = null;

// phone validation
if (isset($_POST['phone'])) {
	$phone = trim($_POST['phone']);
		
	if (strlen($phone) === 0) {
		$error[] = "Phone number is missing";
	}
	else if (strlen($phone) > 20) {
		$error[] = "Phone number can't be over 15 characters";
	}
	else if (!preg_match("/\([0-9]{3}\)[0-9]{3}-[0-9]{4}|[0-9]{3}-[0-9]{3}-[0-9]{4}|\+[0-9]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{4}/", $phone)) {
		// ex: (519)555-999 or 519-555-9999 or +1(519)555-9999
		$error[] = "Phone format must meet North American standard - (519)555-999 or 519-555-9999 or +1(519)555-9999";
	}
}
else {
	$error[] = "Phone number is missing";
}

// address validation
if (isset($_POST['address'])) {
	$address = trim($_POST['address']);
		
	if (strlen($address) === 0) {
		$error[] = "Address is missing";
	}
	else if (strlen($address) > 20) {
		$error[] = "Address can't be over 50 characters";
	}
}
else {
	$error[] = "Address is missing";
}

// suite validation
if (isset($_POST['suite'])) {
	$suite = trim($_POST['suite']);
		
	if (strlen($suite) > 10) {
		$error[] = "Suite can't be over 10 characters";
	}
}

// city validation
if (isset($_POST['city'])) {
	$city = trim($_POST['city']);
		
	if (strlen($city) === 0) {
		$error[] = "City is missing";
	}
	else if (strlen($city) > 20) {
		$error[] = "City can't be over 25 characters";
	}
}
else {
	$error[] = "City is missing";
}

// province validation
if (isset($_POST['province'])) {
	$province = trim($_POST['province']);
		
	if (strlen($province) === 0) {
		$error[] = "Province is missing";
	}
	else if (strlen($province) > 20) {
		$error[] = "Province can't be over 25 characters";
	}
}
else {
	$error[] = "Province is missing";
}

// postal code validation
if (isset($_POST['postalcode'])) {
	$postalcode = trim($_POST['postalcode']);
		
	if (strlen($postalcode) === 0) {
		$error[] = "Postal code is missing";
	}
	else if (strlen($postalcode) > 20) {
		$error[] = "Postal code can't be over 7 characters";
	}
}
else {
	$error[] = "Postal code is missing";
}

// check if no errors and send json back to client
if (count($error) === 0) {
  save_customer($db_conn, $id, $phone, $address, $city, $province, $postalcode, $suite);
  $status[] = "ok";
	echo json_encode($status);
	// set session for future use
	$_SESSION['address']['street_address'] = $address;
	$_SESSION['address']['phone_no'] = $phone;
	$_SESSION['address']['city'] = $city;
	$_SESSION['address']['province'] = $province;
	$_SESSION['address']['postal_code'] = $postalcode;
	$_SESSION['address']['suite'] = $suite;
}
else {
  $status[] = "error";
  $merged_arrays = array_merge($status, $error);
  echo json_encode($merged_arrays);
}

 /*
	* @function:       save_customer()
	* @description:    inserts new address into database using customer id
	* @param:          $db_conn, $id, $phone, $address, 
										 $city, $province, $postalcode, $suite
	* @returns:        none
	*/
function save_customer($db_conn, $id, $phone, $address, $city, $province, $postalcode, $suite) {
  // insert address -> prepared statement
  $insert_ad = $db_conn->prepare("INSERT INTO address (cust_id, phone_no, street_address, city, province, postal_code, suite) VALUES (?, ?, ?, ?, ?, ?, ?)");
  $insert_ad->bind_param("issssss", $id, $phone, $address, $city, $province, $postalcode, $suite);
	$insert_ad->execute();
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

<?php
/*
 * @program:	    startOrder.php
 * @description:  check if user already exists in the database
 * @author:       Mykel Agathos
 * @date:         Mar 30, 2018
 * @revision:	    v1.0
 */

session_start();

header("Content-Type: application/json", true); // json returned

// globals
$db_conn = connect_db();
$customer = array();
$password = null;

// email validation, if error found send back to json
if (isset($_POST['email'])) {
	$email = trim($_POST['email']);

	if (isset($_POST['password'])) {
		$password = $_POST['password'];
		$md5password = md5($password);
	}
	else {
		$error[] = "Password is missing";
	}
			
	if (strlen($email) === 0) {
		$customer["error"] = "E-mail address is missing";
		echo json_encode($customer);
	}
	else if (strlen($email) > 50) {
		$customer["error"] = "E-mail address can't be over 50 characters";
		echo json_encode($customer);
	}
	else if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $email)) {
		// ex. mike@fanshawe.com
		$customer["error"] = "E-mail address isn't formatted properly";
		echo json_encode($customer);
	}
	else {
		// if customer exists -> status 'exists' to client
		$qry = "SELECT id, email FROM customer WHERE email='$email' and password='$md5password';";
		$rs = $db_conn->query($qry);
		if ($rs->num_rows > 0) {
			$row = $rs->fetch_assoc();
			$customer = array("status" => "exists");
			$id = array("id" => $row['id']);
			$merged_array = array_merge($customer, $id);
			echo json_encode($merged_array);
			$_SESSION['email'] = $email; // set session for future use
			$_SESSION['id'] = $row['id']; // set session for future use
		}
		else {
			// if customer doesn't exist, status 'signup'
			$customer = array("status" => "signup");
			$email = array("email" => $email);
			$merged_array = array_merge($customer, $email);
			echo json_encode($merged_array);
		}
	}
}
else {
	$customer["error"] = "E-mail address is missing";
}

function connect_db(){
	$db_conn = new mysqli('localhost', 'admin', 'admin', 'pizza_store');
	if ($db_conn->connect_errno) {
		printf ("Could not connect to database server\n Error: "
				.$db_conn->connect_errno ."\n Report: "
				.$db_conn->connect_error."\n");
		die;
	}
	return $db_conn;
}

function disconnect_db($db_conn){
	$db_conn->close();
}

disconnect_db($db_conn);

?>

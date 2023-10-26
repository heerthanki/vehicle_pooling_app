<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'vehicle_sharing_app';

// 
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (isset($_POST['employeeId']) && isset($_POST['password'])) {
    $employeeId = $_POST['employeeId'];
    $password = $_POST['password'];

    $sql = "SELECT emp_id, emp_name, emp_contact, dob, emp_email, emp_address, emp_dept, emp_desig, password FROM employee WHERE emp_id = '$employeeId'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $storedPassword = $row['password'];
        if (password_verify($password, $storedPassword)) {
            $employeeDetails = array(
                "emp_id" => $row['emp_id'],
                "emp_name" => $row['emp_name'],
                "emp_contact" => $row['emp_contact'],
                "dob" => $row['dob'],
                "emp_email" => $row['emp_email'],
                "emp_address" => $row['emp_address'],
                "emp_dept" => $row['emp_dept'],
                "emp_desig" => $row['emp_desig']
            );
            echo json_encode($employeeDetails);
        } else {
            echo json_encode(array("error" => "Invalid password"));
        }
    } else {
        echo json_encode(array("error" => "Employee not found"));
    }
} else {
    echo json_encode(array("error" => "Invalid input"));
}

$conn->close();
?>

<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'vehicle_sharing_app';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT emp_id, emp_name, emp_contact, dob, emp_email, password, emp_address, emp_dept, emp_desig, Organization, Institute FROM employee LIMIT 1"; // Add "LIMIT 1" to fetch only one row
$result = $conn->query($sql);

$employeeData = null;

if ($result->num_rows > 0) {
    $employeeData = $result->fetch_assoc();
}

$conn->close();
header('Content-Type: application/json');

echo json_encode($employeeData);
?>

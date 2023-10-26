<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'vehicle_sharing_app';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the JSON data sent from the React application
        $data = json_decode(file_get_contents("php://input"));

        // Extract data from the JSON object
        $emp_id = $data->emp_id;
        echo $emp_id;
        $emp_email = $data->emp_email;
        $emp_contact = $data->emp_contact;
        $emp_address = $data->emp_address;
        $emp_dept = $data->emp_dept;
        $emp_design = $data->emp_design;
        $Institute = $data->Institute;
        $vehicleDetails = json_encode($data->vehicleDetails);

        // Prepare and execute an SQL update query
        $sql = "UPDATE employee SET emp_email=?, emp_contact=?, emp_address=?, emp_dept=?, emp_design=?, Institute=?, vehicleDetails=? WHERE emp_id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$emp_email, $emp_contact, $emp_address, $emp_dept, $emp_design, $Institute, $vehicleDetails, $emp_id]);

        // Send a response back to the React application
        $response = ["message" => "Profile updated successfully"];
        echo json_encode($response);
        echo $response;
    }
} catch (PDOException $e) {
    // Handle database errors
    $response = ["error" => "Database error: " . $e->getMessage()];
    echo json_encode($response);
} catch (Exception $e) {
    // Handle other exceptions
    $response = ["error" => "Error: " . $e->getMessage()];
    echo json_encode($response);
}
?>

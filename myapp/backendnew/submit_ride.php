<?php
$host = 'localhost'; // Replace with your MySQL server hostname
$username = 'root'; // Replace with your MySQL username
$password = ''; // Replace with your MySQL password
$database = 'vehicle_sharing_app'; // Replace with your MySQL database name

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use prepared statements to prevent SQL injection
$source = isset($_POST['source']) ? $_POST['source'] : '';
$destination = isset($_POST['destination']) ? $_POST['destination'] : '';
$time = isset($_POST['time']) ? $_POST['time'] : '';
$seats = isset($_POST['number']) ? $_POST['number'] : '';
$vehicle = isset($_POST['vehicle']) ? $_POST['vehicle'] : '';
$gender = isset($_POST['gender']) ? $_POST['gender'] : '';
$date = isset($_POST['date']) ? $_POST['date'] : '';

// Split the date string into day, month, and year
$dateParts = explode('-', $date);

// Check if there are three parts (day, month, and year)
if (count($dateParts) === 3) {
    $day = $dateParts[0];
    $month = $dateParts[1];
    $year = $dateParts[2];
}
    // Create a formatted date string in 'yyyy-MM-dd' format
    $mysqlDate = date('Y-m-d', strtotime("$year-$month-$day"));

    // Create a prepared statement
    $stmt = $conn->prepare("INSERT INTO rides (source, destination, date, time, number_of_seats, vehicle, gender) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssiss", $source, $destination, $mysqlDate, $time, $seats, $vehicle, $gender);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo '<!DOCTYPE html>
        <html>
        <head>
            <!-- Redirect to home page after 3 seconds -->
            <script>
                setTimeout(function () {
                    window.location.href = "http://localhost:3000/home";
                }, 3000); // Redirect after 3 seconds
            </script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                }
                .container {
                    text-align: center;
                    padding: 50px;
                }
                .success-message {
                    font-size: 24px;
                    color: #4CAF50;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p class="success-message">Ride data inserted successfully! Redirecting to home page...</p>
            </div>
        </body>
        </html>';
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
    ?>
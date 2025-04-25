<?php
header("Access-Control-Allow-Origin: *");

// Allow credentials (cookies, HTTP auth, etc. — optional)
header("Access-Control-Allow-Credentials: true");

// Allow these request methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow these headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// If it's a preflight OPTIONS request, just exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Get raw POST data and decode it as JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate the input
if (!$data || !isset($data['code']) || empty($data['code'])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input: Missing employee code."
    ]);
    exit;
}

// Database connection setup
$host = "localhost";
$username = "root"; // Your DB username
$password = "";
$database = "employeedb"; // Your DB name

$conn = new mysqli($host, $username, $password, $database);

// Check for DB connection error
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Sanitize and extract input values
$code = $conn->real_escape_string($data['code']);
$last_name = $conn->real_escape_string($data['last_name'] ?? '');
$first_name = $conn->real_escape_string($data['first_name'] ?? '');
$birthday = $conn->real_escape_string($data['birthday'] ?? '');
$sex = $conn->real_escape_string($data['sex'] ?? '');
$address = $conn->real_escape_string($data['address'] ?? '');

// Prepare the SQL update statement
$sql = "
    UPDATE employees
    SET 
        last_name = '$last_name',
        first_name = '$first_name',
        birthday = '$birthday',
        sex = '$sex',
        address = '$address'
    WHERE code = '$code'
";

// Execute and respond
if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "success" => true,
        "message" => "Employee updated successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error updating record: " . $conn->error
    ]);
}

// Close the DB connection
$conn->close();
?>
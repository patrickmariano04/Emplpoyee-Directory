<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect to database
$mysqli = new mysqli("localhost", "root", "", "employeedb");
if ($mysqli->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

// Handle GET request (fetch all employees)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $mysqli->query("SELECT * FROM employees");
    $employees = [];

    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }

    echo json_encode($employees);
    $mysqli->close();
    exit;
}

// Handle POST request (add employee)
$data = json_decode(file_get_contents("php://input"), true);

$code = isset($data['code']) ? htmlspecialchars($data['code']) : '';
$lastName = isset($data['lastName']) ? htmlspecialchars($data['lastName']) : '';
$firstName = isset($data['firstName']) ? htmlspecialchars($data['firstName']) : '';
$birthday = isset($data['birthday']) ? $data['birthday'] : '';
$sex = isset($data['sex']) ? $data['sex'] : '';
$address = isset($data['address']) ? htmlspecialchars($data['address']) : '';

$stmt = $mysqli->prepare("INSERT INTO employees (code, last_name, first_name, birthday, sex, address) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $code, $lastName, $firstName, $birthday, $sex, $address);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Employee added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error adding employee: " . $stmt->error]);
}



$stmt->close();
$mysqli->close();
?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
// Include database connection
$mysqli = new mysqli("localhost", "root", "", "employeedb");
if ($mysqli->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

// Get the incoming request's method
$method = $_SERVER['REQUEST_METHOD'];

// Handle DELETE request
if ($method == 'DELETE') {
    // Read the raw POST data (body of the request)
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if the 'id' key is present in the request
    if (isset($data['id']) && !empty($data['id'])) {
        $employeeId = $data['id'];

        // Prepare SQL query to delete the employee by ID
        $sql = "DELETE FROM employees WHERE id = ?";

        // Prepare the statement
        if ($stmt = $mysqli->prepare($sql)) {
            // Bind the parameter to the query
            $stmt->bind_param("i", $employeeId);

            // Execute the query
            if ($stmt->execute()) {
                // Success: Respond with a success message
                echo json_encode(["success" => true, "message" => "Employee deleted successfully."]);
            } else {
                // Error: Respond with an error message
                echo json_encode(["success" => false, "message" => "Failed to delete employee."]);
            }

            // Close the statement
            $stmt->close();
        } else {
            // Error: SQL query preparation failed
            echo json_encode(["success" => false, "message" => "Failed to prepare the query."]);
        }

        // Close the database connection
        $mysqli->close();
    } else {
        // Error: No employee ID provided
        echo json_encode(["success" => false, "message" => "Employee ID is required."]);
    }
} else {
    // Error: Method not allowed
    echo json_encode(["success" => false, "message" => "Invalid request method. Only DELETE is allowed."]);
}
?>

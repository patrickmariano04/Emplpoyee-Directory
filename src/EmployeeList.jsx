import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/src/Add_Employee.php") // Replace with correct path
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      fetch(`http://localhost:3000/src/Delete_Employee.php`, {
        // Make sure the correct endpoint is set
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the employee ID to the backend
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setEmployees(
              (prevEmployees) => prevEmployees.filter((emp) => emp.id !== id) // Remove employee from the UI
            );
            alert("Employee deleted successfully.");
          } else {
            alert("Error deleting employee: " + data.message); // Show error message if something went wrong
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          alert("Failed to delete employee. Please try again.");
        });
    } else {
      console.log("Deletion canceled by user.");
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-title">👩‍💼 Employee Directory</div>
        <div className="actions">
          <button
            className="btn btn-add"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </button>

          <button className="btn btn-print" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </header>

      <section className="table-section">
        <div className="table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Birthday</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    No employee records found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.code}</td>
                    <td>{emp.last_name}</td>
                    <td>{emp.first_name}</td>
                    <td>{emp.birthday}</td>
                    <td>{emp.sex}</td>
                    <td>{emp.address}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => navigate(`/EditEmployee`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

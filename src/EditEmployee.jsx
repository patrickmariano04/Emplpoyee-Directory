import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEmployee.css";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    last_name: "",
    first_name: "",
    birthday: "",
    sex: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/src/Update_Employee.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // no "id" here
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Employee updated successfully!");
          navigate("/");
        } else {
          alert("Update failed: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
        alert("Something went wrong. Try again.");
      });
  };
  
  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="header-container">
          <h2>Edit Employee</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <label>Employee Code</label>
          <input
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleChange}
            required
            type="text"
            
          />
          <div className="row">
            <div>
                <label>LastName</label>
              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div>
                <label>FirstName</label>
              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
          </div>
            <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
            <label>Address</label>
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            type="text"
          />
          <div className="form-actions">
            <button type="submit" className="blue">
              Update
            </button>
            <button
              type="button"
              className="gray"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

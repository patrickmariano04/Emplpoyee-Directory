import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    lastName: "",
    firstName: "",
    birthday: "",
    sex: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault("/");

    const response = await fetch("http://localhost:3000/src/Add_Employee.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.success) {
      alert("Employee added successfully");
      navigate("/");
    } else {
      alert("Error adding employee");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
  <label>Employee Code</label>
  <input
    type="text"
    name="code"
    placeholder="Employee Code"
    onChange={handleChange}
    required
  />

  <div className="row">
    <div>
      <label>LastName</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>FirstName</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <label>Birthday</label>
  <input
    type="date"
    name="birthday"
    onChange={handleChange}
    required
  />

  <label>Sex</label>
  <select
    name="sex"
    onChange={handleChange}
    required
  >
    <option value="">Select Sex</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

  <label>Address</label>
  <input
    type="text"
    name="address"
    placeholder="Address"
    onChange={handleChange}
    required
  />

  <div className="form-actions">
    <button type="submit" className="btn blue">Add Employee</button>
    <button type="button" className="btn gray" onClick={handleCancel}>Cancel</button>
  </div>
</form>

      </div>
    </div>
  );
}

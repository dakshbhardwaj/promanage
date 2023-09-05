import React, { useState } from "react";

function AddProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [showSuggestions, setShowSuggestion] = useState(false);

  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      designation: "Software Engineer",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      designation: "UI Designer",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      designation: "Project Manager",
    },
  ]);

  let [acceptedEmployees, setAcceptedEmployee] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!company) {
      newErrors.company = "Company is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start Date is required";
    }
    if (!endDate) {
      newErrors.endDate = "End Date is required";
    }

    if (!estimatedDeliveryDate) {
      newErrors.estimatedDeliveryDate = "Estimated Delivery Date is required";
    }

    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
    }

    if (startDate && endDate && startDate === endDate) {
      newErrors.endDate = "End Date cannot be the same as Start Date";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        name,
        description,
        company,
        startDate,
        endDate,
      };
      setShowSuggestion(true);
      console.log("Form data:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const removeEmployee = (index) => {
    employees.splice(index, 1);
    setEmployees(employees);
  };

  const acceptEmployee = (employeeId) => {
    acceptedEmployees.push(employeeId);
    setAcceptedEmployee(acceptedEmployees);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="Enter company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.company && <p className="text-danger">{errors.company}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            placeholder="Enter start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.startDate && (
            <p className="text-danger">{errors.startDate}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="estimatedDeliveryDate" className="form-label">
            Estimated Delivery Date
          </label>
          <input
            type="text"
            className="form-control"
            id="estimatedDeliveryDate"
            placeholder="Enter estimated delivery date"
            disabled={showSuggestions}
            value={estimatedDeliveryDate}
            onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
          />
          {errors.estimatedDeliveryDate && (
            <p className="text-danger">{errors.estimatedDeliveryDate}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            placeholder="Enter end date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {showSuggestions ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Add</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.designation}</td>
                  <td>
                    <button
                      onClick={() => {
                        acceptEmployee(employee.id);
                      }}
                      disabled={acceptedEmployees.includes(employee.id)}
                    >
                      {acceptedEmployees.includes(employee.id)
                        ? "Added"
                        : "Add"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        removeEmployee(index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default AddProjectForm;

import React, { useState } from "react";

function AddProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");

  const [errors, setErrors] = useState({});

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
      console.log("Form data:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
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
        />
        {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
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
        />
        {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddProjectForm;

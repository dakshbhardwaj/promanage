import React, { useState } from "react";

function AddProjectForm() {
  return (
    <form>
      <div className="form-group">
        <label for="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter description"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1" className="form-label">
          Company
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter company"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter start date"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1" className="form-label">
          End Date
        </label>
        <input
          type="date"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter end date"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddProjectForm;

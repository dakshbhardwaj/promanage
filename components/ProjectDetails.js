// components/ProjectDetails.js
import Link from "next/link";
import React from "react";

const ProjectDetails = ({ project, projectUsers }) => {
  return (
    <div>
      <h1>Project Details</h1>
      <div className="mb-3">
        <strong>Project Name:</strong> {project.name}
      </div>
      <div className="mb-3">
        <strong>Description:</strong> {project.description}
      </div>
      <div className="mb-3">
        <strong>Client:</strong> {project.client}
      </div>
      <div className="mb-3">
        <strong>Status:</strong> {project.status}
      </div>
      <div className="mb-3">
        <strong>Estimated Delivery Time:</strong>{" "}
        {project.estimatedDeliveryTime}
      </div>
      <div className="mb-3">
        <strong>Start Date:</strong> {project.startDate}
      </div>
      <div className="mb-3">
        <strong>End Date:</strong> {project.endDate}
      </div>
      {projectUsers.length > 0 ? (
        <div className="mb-3">
          <h2>Employees</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {projectUsers.map((projectUser, index) => {
                let employee = projectUser.userId;
                return (
                  <tr key={index}>
                    <td>
                      <Link href={`../employee/${employee._id}`}>
                        {employee.displayName}
                      </Link>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.designation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetails;

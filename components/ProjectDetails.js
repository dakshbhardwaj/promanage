// components/ProjectDetails.js
import { useRouter } from "next/router";
import React from "react";
import { convertISODateToCustomFormat } from "../utils";

const ProjectDetails = ({ project, projectUsers }) => {
  const router = useRouter();
  return (
    <div className="container mt-5">
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
        <strong>Start Date:</strong>{" "}
        {convertISODateToCustomFormat(project.startDate)}
      </div>
      <div className="mb-3">
        <strong>End Date:</strong>{" "}
        {convertISODateToCustomFormat(project.endDate)}
      </div>
      {projectUsers?.length > 0 ? (
        <div className="mb-3">
          <h2>Employees</h2>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {projectUsers.map((projectUser, index) => {
                let employee = projectUser.userId;
                return employee ? (
                  <tr
                    key={index}
                    onClick={() => {
                      router.push(`../employee/${employee._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>{employee.displayName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.designation}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetails;

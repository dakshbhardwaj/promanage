import Link from "next/link";
import React from "react";
import { ProficiencyRating } from "../constants.js";

const EmployeeDetails = ({ employee }) => {
  return employee.user ? (
    <div>
      <h1>Employee Details</h1>
      <div className="mb-3">
        <strong>Name:</strong> {employee.user?.displayName ?? ""}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {employee.user?.email ?? ""}
      </div>
      <div className="mb-3">
        <strong>Years of Experience:</strong>{" "}
        {employee.user?.yearsOfExperience ?? 0} years
      </div>
      <div className="mb-3">
        <strong>Designation:</strong> {employee.user?.designation ?? ""}
      </div>
      {employee.skills?.length > 0 ? (
        <div className="mb-3">
          <h2>Skills</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Language</th>
                <th>Years of Experience</th>
                <th>Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {employee.skills.map((skill, index) => (
                <tr key={index}>
                  <td>{skill.skill.name}</td>
                  <td>{skill.yearsOfExperience} years</td>
                  <td>{ProficiencyRating?.[skill?.rating ?? "1"]?.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {employee.projects ? (
        <div className="mb-5">
          <h2>Projects</h2>
          <div>
            <h3>Current Projects</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {employee.projects

                  .filter(
                    (project) => project?.project?.status === "In Progress"
                  )
                  .map((projectMap, index) => {
                    const project = projectMap.project;
                    return (
                      <tr key={index}>
                        <td>
                          <Link href={`../project/${project._id}`}>
                            {project.name}
                          </Link>
                        </td>
                        <td>{project.status}</td>
                        <td>{project.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Upcoming Projects</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {employee.projects
                  .filter(
                    (project) => project?.project?.status === "Not Started"
                  )
                  .map((projectMap, index) => {
                    const project = projectMap.project;
                    return (
                      <tr key={index}>
                        <td>
                          <Link href={`../project/${project._id}`}>
                            {project.name}
                          </Link>
                        </td>
                        <td>{project.status}</td>
                        <td>{project.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Completed Projects</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {employee.projects
                  .filter((project) => project?.project?.status === "Completed")
                  .map((projectMap, index) => {
                    const project = projectMap.project;
                    return (
                      <tr key={index}>
                        <td>
                          <Link href={`../project/${project._id}`}>
                            {project.name}
                          </Link>
                        </td>
                        <td>{project.status}</td>
                        <td>{project.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div>Loading ...</div>
  );
};

export default EmployeeDetails;

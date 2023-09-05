import Link from "next/link";
import React from "react";

const EmployeeDetails = ({ employee }) => {
  console.log({ employee });
  return (
    <div>
      <h1>Employee Details</h1>
      <div className="mb-3">
        <strong>Name:</strong> {employee.user.displayName}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {employee.user.email}
      </div>
      <div className="mb-3">
        <strong>Years of Experience:</strong> {employee.user.yearsOfExperience}{" "}
        years
      </div>
      <div className="mb-3">
        <strong>Designation:</strong> {employee.user.designation}
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
                  <td>{skill.language}</td>
                  <td>{skill.yearsOfExperience} years</td>
                  <td>{skill.proficiency}</td>
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
                  .filter((project) => project.status === "current")
                  .map((project, index) => (
                    <tr key={index}>
                      <td>
                        <Link href={`../project/${project.id}`}>
                          {project.name}
                        </Link>
                      </td>
                      <td>In Progress</td>
                      <td>{project.description}</td>
                    </tr>
                  ))}
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
                  .filter((project) => project.status === "upcoming")
                  .map((project, index) => (
                    <tr key={index}>
                      <td>
                        <Link href={`../project/${project.id}`}>
                          {project.name}
                        </Link>
                      </td>
                      <td>Upcoming</td>
                      <td>{project.description}</td>
                    </tr>
                  ))}
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
                  .filter((project) => project.status === "completed")
                  .map((project, index) => (
                    <tr key={index}>
                      <td>
                        <Link href={`../project/${project.id}`}>
                          {project.name}
                        </Link>
                      </td>
                      <td>Completed</td>
                      <td>{project.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EmployeeDetails;

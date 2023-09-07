import Link from "next/link";
import React from "react";
import { ProficiencyRating } from "../constants.js";
import { useRouter } from "next/router.js";

const EmployeeDetails = ({ employee }) => {
  const router = useRouter();
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Language</th>
                <th>Years of Experience</th>
                <th>Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {employee.skills.map((skill, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
            <h4>Current Projects</h4>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
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
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(`../project/${project._id}`);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{project.name}</td>
                        <td>{project.status}</td>
                        <td>{project.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <h4>Upcoming Projects</h4>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
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
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(`../project/${project._id}`);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{project.name}</td>
                        <td>{project.status}</td>
                        <td>{project.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <h4>Completed Projects</h4>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
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
                      <tr
                        key={index}
                        onClick={() => {
                          router.push(`../project/${project._id}`);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{project.name}</td>
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

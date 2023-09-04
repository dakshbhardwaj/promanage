import React from "react";
import { useRouter } from "next/router";
import EmployeeDetails from "../../components/EmployeeDetails";

const EmployeePage = () => {
  const router = useRouter();
  const employee = {
    name: "John Doe",
    email: "john.doe@example.com",
    yearsOfExperience: 5,
    designation: "Software Engineer",
    skills: [
      {
        language: "JavaScript",
        yearsOfExperience: 4,
        proficiency: "Advanced",
      },
      {
        language: "React Native",
        yearsOfExperience: 3,
        proficiency: "Intermediate",
      },
      {
        language: "Node.js",
        yearsOfExperience: 2,
        proficiency: "Basic",
      },
    ],
    projects: [
      {
        name: "Project A",
        status: "current",
        description: "Working as a frontend developer on Project A.",
      },
      {
        name: "Project B",
        status: "upcoming",
        description: "Scheduled to work on Project B next month.",
      },
      {
        name: "Project C",
        status: "completed",
        description: "Successfully completed Project C last year.",
      },
    ],
  };

  return (
    <div>
      <EmployeeDetails employee={employee} />
    </div>
  );
};

export default EmployeePage;

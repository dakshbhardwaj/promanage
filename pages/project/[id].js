import React from "react";
import { useRouter } from "next/router";
import ProjectDetails from "../../components/ProjectDetails";

const ProjectPage = () => {
  const router = useRouter();
  const project = {
    name: "Project A",
    description: "This is a sample project description.",
    client: "ABC Corporation",
    status: "In Progress",
    estimatedDeliveryTime: "3 months",
    startDate: "2023-01-15",
    endDate: "2023-04-15",
    employees: [
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
    ],
  };

  return (
    <div>
      <ProjectDetails project={project} />
    </div>
  );
};

export default ProjectPage;

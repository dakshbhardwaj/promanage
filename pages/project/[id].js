import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectDetails from "../../components/ProjectDetails";
import axios from "axios";

const ProjectPage = () => {
  const router = useRouter();
  const [project, setProject] = useState({});

  useEffect(() => {
    console.log({ router });
    axios
      .get(`https://promanage-fpft.onrender.com/project/${router.query.id}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <div>
      <ProjectDetails project={project} />
    </div>
  );
};

export default ProjectPage;

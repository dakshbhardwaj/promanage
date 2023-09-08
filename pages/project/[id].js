import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectDetails from "../../components/ProjectDetails";
import axios from "axios";
import LottieLoader from "react-lottie-loader";
import loaderAnimation from "../../public/loader-animation.json";

const ProjectPage = () => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [projectUsers, setProjectUsers] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    setIsDataLoading(true);
    axios
      .get(`https://promanage-fpft.onrender.com/project/${router.query.id}`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
    axios
      .get(
        `https://promanage-fpft.onrender.com/project-user/${router.query.id}`
      )
      .then((res) => {
        console.log(res.data);
        setProjectUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <div className="container mt-5">
      <h3
        onClick={() => {
          router.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        &nbsp; Project Details
      </h3>
      <br />
      <br />
      {isDataLoading ? (
        <div
          style={{
            width: "100vh",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieLoader
            animationData={loaderAnimation}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ) : (
        <ProjectDetails project={project} projectUsers={projectUsers} />
      )}
    </div>
  );
};

export default ProjectPage;

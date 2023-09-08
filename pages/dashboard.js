import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ManageEmployee from "../components/ManageEmployee";
import ManageProjects from "../components/ManageProjects";
import CreateEmployeePage from "../components/CreateEmployeePage";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("project");

  const handleDashboardClick = () => setSelectedTab("dashboard");
  const handleProjectsClick = () => setSelectedTab("project");
  const handleEmployeesClick = () => setSelectedTab("employee");
  const handleUserDetailsClick = () => setSelectedTab("userDetail");
  const handleActivitiesClick = () => setSelectedTab("activities");
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
    if (!session?.user) {
      // router.push("/");
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: "64f99a1e86c6020033a94301",
          isAdmin: true,
        })
      );
    }
    if (router.asPath) {
      var tab = router.asPath.split("#")[1];
      setSelectedTab(tab?.toLowerCase() ?? "project");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    localStorage.removeItem("user");
    await signOut();
    router.push("/");
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          <svg
            width="229"
            height="36"
            viewBox="0 0 229 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.7398 8.13607C28.9548 4.63038 25.8216 2 22.0863 2C18.768 2 15.9247 4.07438 14.7785 6.99505L4.73438 34H8.5968C11.1368 27.1695 18.1347 8.3549 18.1503 8.31694L18.1547 8.30577C18.7725 6.73826 20.3023 5.62626 22.0863 5.62626C24.4167 5.62626 26.31 7.52425 26.31 9.85542H29.9316H32.3445L29.7398 8.13607Z"
              fill="#3D3933"
              stroke="#fff"
            ></path>
            <path
              d="M6.62158 15.835C6.62158 21.2744 11.0415 25.7 16.4739 25.7C21.9063 25.7 26 21 26.3262 15.835H29.9478C29.5 23 23.9044 29.3263 16.4739 29.3263C9.0434 29.3263 3 23.2751 3 15.835H6.62158Z"
              fill="#3D3933"
              stroke="#fff"
            ></path>
            <path
              d="M55.688 26H51.768V10.32H46.42V6.68H61.092V10.32H55.688V26ZM61.1032 26V11.16H64.7432V14.128C65.6392 12.084 67.9912 10.88 70.3432 10.88V14.996C68.2992 14.996 64.7152 15.724 64.7152 23.34V26H61.1032ZM86.4053 11.16V26H82.7653V23.032C81.8973 25.048 79.7973 26.392 77.4453 26.392C74.2253 26.392 71.7053 23.9 71.7053 20.092V11.16L75.2613 11.132V19.7C75.2613 21.548 76.3813 22.864 78.3133 22.864C80.3293 22.864 82.7933 21.352 82.7933 13.708V11.16H86.4053ZM92.5373 16.928H99.1173C98.6413 15.164 97.3533 14.212 95.8973 14.212C94.2453 14.212 92.9293 15.108 92.5373 16.928ZM99.5373 21.24L102.393 23.424C100.909 25.244 98.6693 26.28 96.0933 26.28C91.5293 26.28 88.6173 22.92 88.6173 18.468C88.6173 14.268 91.3333 10.796 96.0093 10.796C100.433 10.796 103.065 14.66 103.065 18.468V19.896H92.4813C92.9293 21.716 94.2733 22.864 96.1213 22.864C97.7173 22.864 98.8373 22.108 99.5373 21.24ZM110.582 23.816L113.13 20.848C114.614 22.136 116.21 22.92 118.002 22.92C121.194 22.92 121.894 21.576 121.894 20.792C121.894 20.204 121.782 19.308 117.834 18.244C113.746 17.124 111.002 15.08 111.282 11.356C111.534 8.276 114.502 6.176 118.422 6.176C120.858 6.176 123.49 6.988 125.17 8.976L122.342 11.72C121.642 10.712 120.186 9.928 118.422 9.928C115.79 9.928 115.286 11.328 115.258 11.664C115.202 12.42 115.258 13.484 118.87 14.464C122.622 15.472 125.87 17.04 125.87 20.792C125.87 25.132 121.642 26.672 118.002 26.672C115.062 26.672 112.57 25.552 110.582 23.816ZM127.602 11.16H131.242C131.242 11.888 131.242 12.756 131.27 13.4C132.446 11.944 134.042 10.628 136.702 10.628C140.986 10.628 144.094 14.156 144.094 18.384C144.094 22.332 141.658 26.392 136.562 26.392C134.238 26.392 132.194 25.048 131.27 23.536V32.608H127.63V24.908C127.63 22.696 127.938 20.792 128.554 18.608C127.854 16.06 127.602 13.904 127.602 11.16ZM131.802 18.468C132.782 21.212 134.406 22.836 136.394 22.836C138.718 22.836 140.398 20.876 140.398 18.384C140.398 16.004 138.718 14.184 136.534 14.184C134.686 14.184 132.726 15.528 131.802 18.468ZM157.898 18.608C156.89 15.864 155.294 14.24 153.306 14.24C150.982 14.24 149.274 16.2 149.274 18.692C149.274 21.072 150.982 22.864 153.166 22.864C155.014 22.864 156.974 21.548 157.898 18.608ZM162.098 26.028H158.458C158.458 25.3 158.458 24.32 158.43 23.676C157.226 25.132 155.714 26.448 153.026 26.448C148.742 26.448 145.578 22.92 145.578 18.692C145.578 14.744 148.042 10.684 153.138 10.684C155.462 10.684 157.506 12.084 158.43 13.596C158.458 12.896 158.458 11.832 158.458 11.16H162.098C162.098 13.372 161.846 16.088 161.146 18.58C161.846 21.128 162.098 23.844 162.098 26.028ZM164.9 26V11.16H168.54V14.128C169.436 12.084 171.788 10.88 174.14 10.88V14.996C172.096 14.996 168.512 15.724 168.512 23.34V26H164.9ZM175.81 26V11.16H179.45V14.128C180.346 12.084 182.698 10.88 185.05 10.88V14.996C183.006 14.996 179.422 15.724 179.422 23.34V26H175.81ZM193.524 26.476C189.184 26.476 185.824 22.864 185.824 18.58C185.824 14.268 189.296 10.684 193.636 10.684C197.92 10.684 201.308 14.268 201.308 18.58C201.308 22.892 197.808 26.476 193.524 26.476ZM193.496 22.892C195.708 22.892 197.584 20.96 197.584 18.552C197.584 16.172 195.792 14.24 193.608 14.24C191.424 14.24 189.548 16.172 189.548 18.608C189.548 20.988 191.312 22.892 193.496 22.892ZM201.969 11.16H205.889L209.109 21.828L212.385 11.16H215.997L219.273 21.828L222.521 11.16H226.413L221.681 26H217.341L214.177 16.312L211.041 26H206.673L201.969 11.16Z"
              fill="#fff"
            ></path>
          </svg>
        </a>
        <ul className="navbar-nav px-3">
          <li
            className="nav-item nav-link fs-5 text-nowrap "
            onClick={() => handleSignOut()}
            role="button"
          >
            Log Out
          </li>
        </ul>
      </nav>

      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column mb-2">
              <ul className="nav flex-column">
                <li
                  className={`nav-item ${
                    selectedTab === "project" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#Project"
                    onClick={handleProjectsClick}
                  >
                    Manage Projects
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedTab === "employee" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#Employee"
                    onClick={handleEmployeesClick}
                  >
                    Manage Employees
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedTab === "employee" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#UserDetail"
                    onClick={handleUserDetailsClick}
                  >
                    Update User Details
                  </a>
                </li>
                {/* <li
                  className={`nav-item ${
                    selectedTab === "activities" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleActivitiesClick}
                  >
                    Employee Activities
                  </a>
                </li> */}
              </ul>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          {selectedTab === "project" && (
            <div>
              <ManageProjects />
            </div>
          )}
          {selectedTab === "employee" && (
            <div>
              <ManageEmployee />
            </div>
          )}
          {selectedTab === "userDetail" && (
            <div>
              <CreateEmployeePage />
            </div>
          )}
          {/* {selectedTab === "activities" && <div>Activities</div>} */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

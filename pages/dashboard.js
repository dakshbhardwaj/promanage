import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ManageEmployee from "../components/ManageEmployee";
import ManageProjects from "../components/ManageProjects";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const handleDashboardClick = () => setSelectedTab("dashboard");
  const handleProjectsClick = () => setSelectedTab("projects");
  const handleEmployeesClick = () => setSelectedTab("employees");
  const handleActivitiesClick = () => setSelectedTab("activities");
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
    if (!session?.user) {
      // router.push("/");
      localStorage.setItem("user_id", "64f99a1e86c6020033a94301");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    localStorage.removeItem("user_id");
    await signOut();
    router.push("/");
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          True Sparrow Systems
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button onClick={() => handleSignOut()}>Sign out</button>
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
                    selectedTab === "dashboard" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleDashboardClick}
                  >
                    {/* Your dashboard tab content */}
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedTab === "projects" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleProjectsClick}
                  >
                    Manage Projects
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    selectedTab === "employees" && "active"
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleEmployeesClick}
                  >
                    Manage Employees
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
          {selectedTab === "dashboard" && (
            <div>
              <h2>My Dashboard content</h2>
            </div>
          )}
          {selectedTab === "projects" && (
            <div>
              <ManageProjects />
            </div>
          )}
          {selectedTab === "employees" && (
            <div>
              <ManageEmployee />
            </div>
          )}
          {/* {selectedTab === "activities" && <div>Activities</div>} */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

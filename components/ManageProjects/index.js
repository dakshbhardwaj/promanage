import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://promanage-fpft.onrender.com/project")
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // This code will run only on the client side
    Modal.setAppElement(document.body);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // Track the edited project

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProject({
      ...editingProject,
      [name]: value,
    });
  };

  const openModal = (project) => {
    setIsModalOpen(true);
    setEditingProject(project); // Set the project to edit
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateProject = () => {
    axios
      .put(
        `https://promanage-fpft.onrender.com/project/${editingProject._id}`,
        editingProject
      )
      .then((res) => {
        console.log(res.data);
        const updatedProject = projects.map((proj) =>
          proj._id === editingProject._id ? res.data : proj
        );
        setProjects(updatedProject);
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const deleteProject = (project) => {
    axios
      .delete(`https://promanage-fpft.onrender.com/project/${project._id}`)
      .then(() => {
        const updatedProjects = projects.filter((proj) => proj !== project);
        setProjects(updatedProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-lg">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm">
                <h2>Projects Details</h2>
              </div>
              <div className="col-md-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    router.push("../add-project");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
                    <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                  &nbsp; NEW
                </button>
              </div>
            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Estimated Delivery Time</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    router.push(`../project/${project._id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.estimatedDeliveryTime}</td>
                  <td>{project.startDate}</td>
                  <td>
                    <a
                      className="edit"
                      title="Edit"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal(project);
                      }}
                      style={{
                        padding: 10,
                        paddingLeft: 0,
                      }}
                    >
                      <i className="material-icons">&#xE254;</i>
                    </a>
                    <a
                      className="delete"
                      title="Delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteProject(project);
                      }}
                      style={{
                        padding: 10,
                      }}
                    >
                      <i className="material-icons" color="red">
                        &#xE872;
                      </i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Projects Modal"
        style={modalCustomStyles}
      >
        <h2>{"Edit Project"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editingProject?.name ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={editingProject?.description ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={editingProject?.status ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estimatedDeliveryTime">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              className="form-control"
              id="estimatedDeliveryTime"
              name="estimatedDeliveryTime"
              value={editingProject?.estimatedDeliveryTime ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={editingProject?.startDate ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={updateProject}
          >
            Update Projects
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageProjects;

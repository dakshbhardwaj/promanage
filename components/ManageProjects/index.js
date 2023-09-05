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

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "",
    estimatedDeliveryTime: "",
    startDate: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // Track the edited project

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const openModal = (project) => {
    setIsModalOpen(true);
    setEditingProject(project); // Set the project to edit
    setNewProject({ ...project }); // Initialize the form fields with project data
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addProject = () => {
    setProjects([...projects, newProject]);
    closeModal();
  };

  const updateProject = () => {
    const updatedProject = projects.map((proj) =>
      proj === editingProject ? newProject : proj
    );
    setProjects(updatedProject);
    closeModal();
  };

  const deleteProject = (project) => {
    const updatedProjects = projects.filter((proj) => proj !== project);
    setProjects(updatedProjects);
  };

  return (
    <div className="container-lg">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>Projects Details</h2>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={() => {
                    router.push("../add-project");
                  }}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
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
                <tr key={index}>
                  <td>
                    <Link href={`../project/${project._id}`}>
                      {project.name}
                    </Link>
                  </td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                  <td>{project.estimatedDeliveryTime}</td>
                  <td>{project.startDate}</td>
                  <td>
                    <a
                      className="edit"
                      title="Edit"
                      onClick={() => openModal(project)}
                    >
                      <i className="material-icons">&#xE254;</i> Edit
                    </a>
                    <a
                      className="delete"
                      title="Delete"
                      onClick={() => deleteProject(project)}
                    >
                      <i className="material-icons">&#xE872;</i> Delete
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

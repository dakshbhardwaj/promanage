import axios from "axios";
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
    if (project) {
      setEditingProject(project); // Set the project to edit
      setNewProject({ ...project }); // Initialize the form fields with project data
    } else {
      setEditingProject(null); // Reset editingProjects when adding a new one
      setNewProject({
        name: "",
        description: "",
        status: "",
      });
    }
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
                  onClick={() => openModal(null)}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
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
        <h2>{editingProject ? "Edit Projects" : "Add New Projects"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editingProject ? editingProject.name : newProject.name}
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
              value={
                editingProject
                  ? editingProject.description
                  : newProject.description
              }
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
              value={editingProject ? editingProject.status : newProject.status}
              onChange={handleInputChange}
              required
            />
          </div>
          {editingProject ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={updateProject}
            >
              Update Projects
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={addProject}
            >
              Add Projects
            </button>
          )}
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

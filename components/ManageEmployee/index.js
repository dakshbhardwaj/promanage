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

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://promanage-fpft.onrender.com/users")
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // This code will run only on the client side
    Modal.setAppElement(document.body);
  }, []);

  const [newEmployee, setNewEmployee] = useState({
    displayName: "",
    designation: "",
    yearsOfExperience: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // Track the edited employee

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const openModal = (employee) => {
    setIsModalOpen(true);
    setEditingEmployee(employee); // Set the employee to edit
    setNewEmployee({ ...employee }); // Initialize the form fields with employee data
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateEmployee = () => {
    const updatedEmployees = employees.map((emp) =>
      emp === editingEmployee ? newEmployee : emp
    );
    setEmployees(updatedEmployees);
    closeModal();
  };

  const deleteEmployee = (employee) => {
    const updatedEmployees = employees.filter((emp) => emp !== employee);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="container-lg">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>Employee Details</h2>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={() => {
                    router.push("../create-employee");
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
                <th>Display Name</th>
                <th>Designation</th>
                <th>Years Of Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>
                    <Link href={`../employee/${employee._id}`}>
                      {employee.displayName}
                    </Link>
                  </td>
                  <td>{employee.designation}</td>
                  <td>{employee.yearsOfExperience}</td>
                  <td>
                    <a
                      className="edit"
                      title="Edit"
                      onClick={() => openModal(employee)}
                    >
                      <i className="material-icons">&#xE254;</i> Edit
                    </a>
                    <a
                      className="delete"
                      title="Delete"
                      onClick={() => deleteEmployee(employee)}
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
        contentLabel="Employee Modal"
        style={modalCustomStyles}
      >
        <h2>{"Edit Employee"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              name="displayName"
              value={editingEmployee?.displayName ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              className="form-control"
              id="designation"
              name="designation"
              value={editingEmployee?.designation ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearsOfExperience">Years Of Experience</label>
            <input
              type="text"
              className="form-control"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={editingEmployee?.yearsOfExperience ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={updateEmployee}
          >
            Update Employee
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

export default ManageEmployee;

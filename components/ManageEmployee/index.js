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
  const [user, setUser] = useState(null);
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
    setUser(JSON.parse(localStorage?.getItem?.("user")));
  }, []);

  useEffect(() => {
    // This code will run only on the client side
    Modal.setAppElement(document.body);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // Track the edited employee

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({
      ...editingEmployee,
      [name]: value,
    });
  };

  const openModal = (employee) => {
    setIsModalOpen(true);
    setEditingEmployee(employee); // Set the employee to edit
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateEmployee = () => {
    axios
      .put(
        `https://promanage-fpft.onrender.com/user/${editingEmployee._id}`,
        editingEmployee
      )
      .then((res) => {
        const updatedEmployee = employees.map((emp) =>
          emp._id === editingEmployee._id ? res.data : emp
        );
        setEmployees(updatedEmployee);
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const deleteEmployee = (employee) => {
    axios
      .delete(`https://promanage-fpft.onrender.com/user/${employee._id}`)
      .then(() => {
        const updatedEmployees = employees.filter((emp) => emp !== employee);
        setEmployees(updatedEmployees);
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
                <h2>Employee List</h2>
              </div>
              {/* <div className="col-md-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    router.push("../create-employee");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-add"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                  </svg>
                  &nbsp; NEW
                </button>
              </div> */}
            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Display Name</th>
                <th>Designation</th>
                <th>Years Of Experience</th>
                {user?.isAdmin ? <th>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    router.push(`../employee/${employee._id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{employee.displayName}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.yearsOfExperience}</td>
                  {user?.isAdmin ? (
                    <td>
                      {/* <a
                      className="edit"
                      title="Edit"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal(employee);
                      }}
                      style={{
                        padding: 10,
                        paddingLeft: 0,
                      }}
                    >
                      <i className="material-icons">&#xE254;</i>
                    </a> */}
                      <a
                        className="delete"
                        title="Delete"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteEmployee(employee);
                        }}
                        style={{
                          padding: 10,
                          paddingLeft: 0,
                        }}
                      >
                        <i className="material-icons" color="red">
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  ) : null}
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

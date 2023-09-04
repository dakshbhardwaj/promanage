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
  const [employees, setEmployees] = useState([
    {
      name: "John Doe",
      department: "Administration",
      phone: "(171) 555-2222",
    },
    {
      name: "Peter Parker",
      department: "Customer Service",
      phone: "(313) 555-5735",
    },
    {
      name: "Fran Wilson",
      department: "Human Resources",
      phone: "(503) 555-9931",
    },
  ]);

  useEffect(() => {
    // This code will run only on the client side
    Modal.setAppElement(document.body);
  }, []);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    phone: "",
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
    if (employee) {
      setEditingEmployee(employee); // Set the employee to edit
      setNewEmployee({ ...employee }); // Initialize the form fields with employee data
    } else {
      setEditingEmployee(null); // Reset editingEmployee when adding a new one
      setNewEmployee({
        name: "",
        department: "",
        phone: "",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addEmployee = () => {
    setEmployees([...employees, newEmployee]);
    closeModal();
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
                <h2>
                  Employee <b>Details</b>
                </h2>
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
                <th>Department</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.phone}</td>
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
        <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={newEmployee.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          {editingEmployee ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={updateEmployee}
            >
              Update Employee
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={addEmployee}
            >
              Add Employee
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

export default ManageEmployee;

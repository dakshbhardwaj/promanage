import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import LottieLoader from "react-lottie-loader";
import loaderAnimation from "../public/loader-animation.json";

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

function AddProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [showSuggestions, setShowSuggestion] = useState(false);

  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [project, setProject] = useState();
  const [isProjectSubmitted, setIsProjectSubmitted] = useState(false);
  const [areSuggestionsLoading, setAreSuggestionsLoading] = useState(false);

  const [newEmployeesList, setNewEmployeesList] = useState([]);

  useEffect(() => {
    axios
      .get("https://promanage-fpft.onrender.com/users")
      .then((res) => {
        console.log(res.data);
        setNewEmployeesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let [acceptedEmployees, setAcceptedEmployee] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!company) {
      newErrors.company = "Company is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start Date is required";
    }
    if (!endDate) {
      newErrors.endDate = "End Date is required";
    }

    if (!estimatedDeliveryDate) {
      newErrors.estimatedDeliveryDate = "Estimated Delivery Date is required";
    }

    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
    }

    if (startDate && endDate && startDate === endDate) {
      newErrors.endDate = "End Date cannot be the same as Start Date";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        name,
        description,
        clientName: company,
        estimatedDeliveryTime: estimatedDeliveryDate,
        startDate,
        endDate,
      };
      setIsProjectSubmitted(true);
      axios
        .post("https://promanage-fpft.onrender.com/project", formData)
        .then((res) => {
          console.log(res.data);
          setProject(res.data);
          setAreSuggestionsLoading(true);
          setShowSuggestion(true);
          axios
            .get(`https://promanage-fpft.onrender.com/suggest/${res.data._id}`)
            .then((suggestionRes) => {
              setEmployees(suggestionRes.data.teamMembers);
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAreSuggestionsLoading(false);
        });
    } else {
      setErrors(newErrors);
    }
  };

  const removeEmployee = (employeeId) => {
    const updatedEmployees = employees.filter((emp) => {
      return (emp.userId ?? emp._id) != employeeId;
    });
    const updatedAcceptedEmployees = acceptedEmployees.filter((empId) => {
      return empId != employeeId;
    });
    setEmployees([...updatedEmployees]);
    axios
      .post("https://promanage-fpft.onrender.com/project-user", {
        userIds: updatedAcceptedEmployees,
        projectId: project._id,
      })
      .then(() => {});
    setAcceptedEmployee([...updatedAcceptedEmployees]);
  };

  const acceptEmployee = (employeeId) => {
    acceptedEmployees.push(employeeId);
    setAcceptedEmployee([...acceptedEmployees]);
    axios
      .post("https://promanage-fpft.onrender.com/project-user", {
        userIds: acceptedEmployees,
        projectId: project._id,
      })
      .then(() => {});
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="Enter company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={showSuggestions}
          />
          {errors.company && <p className="text-danger">{errors.company}</p>}
        </div>
        <div className="form-row row g-2">
          <div className="form-group col-md-6">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              placeholder="Enter start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={showSuggestions}
            />
            {errors.startDate && (
              <p className="text-danger">{errors.startDate}</p>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              placeholder="Enter end date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={showSuggestions}
            />
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="estimatedDeliveryDate" className="form-label">
            Estimated Delivery Date
          </label>
          <input
            type="text"
            className="form-control"
            id="estimatedDeliveryDate"
            placeholder="Enter estimated delivery date"
            disabled={showSuggestions}
            value={estimatedDeliveryDate}
            onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
          />
          {errors.estimatedDeliveryDate && (
            <p className="text-danger">{errors.estimatedDeliveryDate}</p>
          )}
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isProjectSubmitted}
        >
          {isProjectSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>
      <br />
      <br />
      {showSuggestions ? (
        <div>
          <h4>Suggestions List</h4>
          <br />
          {areSuggestionsLoading ? (
            <div
              style={{
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Years Of Experience</th>
                  <th>Designation</th>
                  <th>Add</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.displayName}</td>
                    <td>{employee.yearsOfExperience} years</td>
                    <td>{employee.designation}</td>
                    <td>
                      <button
                        onClick={() => {
                          acceptEmployee(employee.userId ?? employee._id);
                        }}
                        disabled={acceptedEmployees.includes(
                          employee.userId ?? employee._id
                        )}
                      >
                        {acceptedEmployees.includes(
                          employee.userId ?? employee._id
                        )
                          ? "Accepted"
                          : "Accept"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          removeEmployee(employee.userId ?? employee._id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!areSuggestionsLoading && (
            <button
              type="button"
              className="btn btn-info add-new"
              onClick={() => openModal(null)}
            >
              Add More
            </button>
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Employee Modal"
            style={modalCustomStyles}
          >
            <div>
              {" "}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Years Of Experience</th>
                    <th>Designation</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {newEmployeesList.map((newEmployee, index) => (
                    <tr key={index}>
                      <td>{newEmployee.displayName}</td>
                      <td>{newEmployee.yearsOfExperience} years</td>
                      <td>{newEmployee.designation}</td>
                      <td>
                        <button
                          onClick={() => {
                            if (
                              employees.some(
                                (emp) =>
                                  (emp.userId ?? emp._id) === newEmployee._id
                              )
                            ) {
                              removeEmployee(newEmployee._id);
                            } else {
                              addEmployee(newEmployee);
                            }
                          }}
                        >
                          {employees.some(
                            (emp) => (emp.userId ?? emp._id) === newEmployee._id
                          )
                            ? "Added"
                            : "Add"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Save
              </button>
            </div>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default AddProjectForm;

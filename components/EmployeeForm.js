// components/EmployeeForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProficiencyRating } from "../constants";
import Modal from "react-modal";
import { getRatingFromProficiency } from "../utils";

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

const EmployeeForm = () => {
  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearsOfExperience: "",
    designation: "",
    skills: [],
  });
  const [currentUser, setCurrentUser] = useState({});

  const [newSkill, setNewSkill] = useState({
    language: "",
    yearsOfExperience: 0,
    proficiency: "amateur",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const openModal = () => {
    setNewSkill({
      language: "",
      yearsOfExperience: 0,
      proficiency: "amateur",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let localUser = localStorage?.getItem?.("user");

    setCurrentUser(JSON.parse(localUser));

    console.log("checj check", JSON.parse(localUser));
    localUser = JSON.parse(localUser);
    setFormData({
      name: localUser?.displayName ?? "",
      email: localUser?.email ?? "",
      yearsOfExperience: localUser?.yearsOfExperience ?? "",
      designation: localUser?.designation ?? "",
      skills: localUser?.skills ?? [],
    });
  }, []);

  const addSkill = () => {
    if (
      newSkill.language &&
      newSkill.yearsOfExperience &&
      newSkill.proficiency
    ) {
      let skill = {
        name: newSkill.language,
        rating: getRatingFromProficiency(newSkill.proficiency),
        yoe: parseFloat(newSkill.yearsOfExperience ?? 0),
      };
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
      setNewSkill({
        language: "",
        yearsOfExperience: 0,
        proficiency: "amateur",
      });
      closeModal();
    } else {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields before submission
    const requiredFields = [
      "name",
      "email",
      "yearsOfExperience",
      "designation",
    ];
    const hasErrors = requiredFields.some((field) => {
      if (!formData[field]) {
        setFormErrors({
          ...formErrors,
          [field]: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        });
        return true;
      }
      return false;
    });

    if (!hasErrors) {
      setIsSubmitInProgress(true);
      axios
        .put(
          `https://promanage-fpft.onrender.com/user/${currentUser?._id ?? ""}`,
          formData
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsSubmitInProgress(false);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <div className="flexbox-container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            className="form-control"
            required
          />
        </div>
        &nbsp; &nbsp; &nbsp;
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your Email"
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="flexbox-container">
        <div className="mb-3">
          <label htmlFor="yearsOfExperience" className="form-label">
            Years of Experience:
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            placeholder="Enter your Years of Experience"
            className="form-control"
            required
          />
        </div>
        &nbsp; &nbsp; &nbsp;
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Enter your Designation"
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <h2>Skills:</h2>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Language</th>
              <th>Years of Experience</th>
              <th>Proficiency</th>
            </tr>
          </thead>
          <tbody>
            {formData.skills.map((skill, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{skill?.skill?.name ?? skill?.name}</td>
                  <td>{skill.yearsOfExperience ?? skill.yoe} years</td>
                  <td>{ProficiencyRating?.[skill?.rating ?? "1"]?.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-primary" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bag-plus-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
          />
        </svg>{" "}
        Add Skill
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Modal"
        style={modalCustomStyles}
      >
        <h2>{"Add Skill"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="language" className="form-label">
              Language:
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={newSkill.language}
              onChange={handleSkillInputChange}
              className="form-control"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="yearsOfExperienceSkill" className="form-label">
              Years of Experience:
            </label>
            <input
              type="number"
              id="yearsOfExperienceSkill"
              name="yearsOfExperience"
              value={newSkill.yearsOfExperience}
              onChange={handleSkillInputChange}
              className="form-control"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="proficiency" className="form-label">
              Proficiency:
            </label>
            <select
              id="proficiency"
              name="proficiency"
              value={newSkill.proficiency}
              onChange={handleSkillInputChange}
              className="form-select"
            >
              {Object.values(ProficiencyRating)?.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button type="button" className="btn btn-success" onClick={addSkill}>
            Add Skill
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </Modal>
      <br />
      <br />
      <button
        type="submit"
        className="btn btn-success"
        disabled={isSubmitInProgress}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check2-circle"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
        </svg>
        &nbsp; {isSubmitInProgress ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default EmployeeForm;

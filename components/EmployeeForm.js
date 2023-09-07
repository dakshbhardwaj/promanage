// components/EmployeeForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProficiencyRating } from "../constants";

const EmployeeForm = () => {
  const userUrl =
    "https://promanage-fpft.onrender.com/user/64f96fe4e06255003378de58";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearsOfExperience: "",
    designation: "",
    skills: [],
  });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios
      .get(userUrl)
      .then((res) => {
        console.log(res.data);
        let userData = res.data;
        setCurrentUser(userData);
        setFormData({
          name: userData?.user?.displayName ?? "",
          email: userData?.user?.email ?? "",
          yearsOfExperience: userData?.user?.yearsOfExperience ?? "",
          designation: userData?.user?.designation ?? "",
          skills: userData?.skills ?? [],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [newSkill, setNewSkill] = useState({
    language: "",
    yearsOfExperience: "",
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

  const addSkill = () => {
    if (
      newSkill.language &&
      newSkill.yearsOfExperience &&
      newSkill.proficiency
    ) {
      let skill = {
        skill: {
          name: newSkill.language,
        },
        rating: newSkill.proficiency,
        yearsOfExperience: newSkill.yearsOfExperience,
      };
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
      setNewSkill({
        language: "",
        yearsOfExperience: "",
        proficiency: "amateur",
      });
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
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            className="form-control"
            required
          />
        </div>
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
            className="form-control"
            required
          />
        </div>
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
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <h2>Skills:</h2>

        <div className="flexbox-container">
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
        </div>
        <button type="button" className="btn btn-primary" onClick={addSkill}>
          Add Skill
        </button>
        <ul className="list-group mt-3">
          {formData.skills.map((skill, index) => (
            <li key={index} className="list-group-item">
              {index + 1}
              {")"} {skill?.skill?.name}, YOE: {skill.yearsOfExperience},
              Proficiency: {skill.rating}
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;

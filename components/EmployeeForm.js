// components/EmployeeForm.js
import React, { useState } from "react";

const proficiencyLevels = [
  { value: "amateur", label: "Amateur" },
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearsOfExperience: "",
    designation: "",
    skills: [],
  });

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
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill],
      });
      setNewSkill({
        language: "",
        yearsOfExperience: "",
        proficiency: "amateur",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, send the data to an API.
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="flexbox-container">
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

      <div class="flexbox-container">
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

        <div class="flexbox-container">
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
              required
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
              required
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
              required
            >
              {proficiencyLevels.map((level) => (
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
              Language: {skill.language}, Years of Experience:{" "}
              {skill.yearsOfExperience}, Proficiency: {skill.proficiency}
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

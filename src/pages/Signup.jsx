import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateName,
  validatePhone,
  validateEmail,
  validatePassword,
} from "../utils/valadidation";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: "yes",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Only alphabets allowed";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Minimum 8 chars, 1 uppercase, 1 number, 1 special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const agencyUsers =
      JSON.parse(localStorage.getItem("agencyUsers")) || [];

    const nonAgencyUsers =
      JSON.parse(localStorage.getItem("nonAgencyUsers")) || [];

    const allUsers = [...agencyUsers, ...nonAgencyUsers];

    const existingUser = allUsers.find(
      (user) =>
        user.email.toLowerCase() ===
        formData.email.toLowerCase()
    );

    if (existingUser) {
      setErrors({
        email: "Email already registered",
      });
      return;
    }

    if (formData.isAgency === "yes") {
      agencyUsers.push(formData);

      localStorage.setItem(
        "agencyUsers",
        JSON.stringify(agencyUsers)
      );
    } else {
      nonAgencyUsers.push(formData);

      localStorage.setItem(
        "nonAgencyUsers",
        JSON.stringify(nonAgencyUsers)
      );
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(formData)
    );

    navigate("/profile");
  };

  return (
    <div className="page">
      <h1 className="form-title">
        Create your
        <br />
        PopX account
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name *</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        <div className="input-group">
          <label>Phone Number *</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            maxLength={10}
            onChange={(e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  }}
          />

          {errors.phone && (
            <p className="error">{errors.phone}</p>
          )}
        </div>

        <div className="input-group">
          <label>Email Address *</label>

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="input-group">
          <label>Password *</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="error">
              {errors.password}
            </p>
          )}
        </div>

        <div className="input-group">
          <label>Company Name</label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="agency-section">
          <p>Are you an Agency? *</p>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={
                  formData.isAgency === "yes"
                }
                onChange={handleChange}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={
                  formData.isAgency === "no"
                }
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="primary-btn full-btn"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
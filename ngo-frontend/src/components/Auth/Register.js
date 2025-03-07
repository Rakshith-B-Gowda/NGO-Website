import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    roles: "USER", // Default role
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "User name should not be null or empty";
    } else if (name.length < 5) {
      return "User name must be at least 5 characters long";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "User email should not be null or empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Email address should be valid";
    }
    return "";
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!password) {
      errors.push("Password should not be null or empty");
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
      }
      if (!/\d/.test(password)) {
        errors.push("Password must contain at least one digit");
      }
      if (!/[!@#$%^&*()]/.test(password)) {
        errors.push("Password must contain at least one special character");
      }
    }
    return errors;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleBlur = (field) => {
    let error = "";
    if (field === "userName") {
      error = validateName(userData.userName);
    } else if (field === "userEmail") {
      error = validateEmail(userData.userEmail);
    } else if (field === "userPassword") {
      error = validatePassword(userData.userPassword);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors and success messages
    setErrors({});
    setSuccess("");

    // Validate inputs
    const nameError = validateName(userData.userName);
    const emailError = validateEmail(userData.userEmail);
    const passwordErrors = validatePassword(userData.userPassword);
    const confirmPasswordError = validateConfirmPassword(
      userData.userPassword,
      userData.confirmPassword
    );

    if (nameError || emailError || passwordErrors.length > 0 || confirmPasswordError) {
      setErrors({userName: nameError, userEmail: emailError, userPassword: passwordErrors, confirmPassword: confirmPasswordError,
      });
      return;
    }

    try {
      // Prepare data for submission
      const submissionData = {
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPassword: userData.userPassword,
        roles: userData.roles,
      };

      const response = await authService.register(submissionData);
      setSuccess(response.data);
      setUserData({
        userName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        roles: "USER",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrors({ submit: "An error occurred during registration" });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setUserData({ ...userData, confirmPassword });
    const confirmPasswordError = validateConfirmPassword(
      userData.userPassword,
      confirmPassword
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError,
    }));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="p-4 border rounded"
        style={{ width: "100%", maxWidth: "400px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center">User Registration</h2>
        {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Username field */}
          <Form.Group controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={userData.userName}
              isInvalid={!!errors.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              onBlur={() => handleBlur("userName")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email field */}
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userData.userEmail}
              isInvalid={!!errors.userEmail}
              onChange={(e) =>
                setUserData({ ...userData, userEmail: e.target.value })
              }
              onBlur={() => handleBlur("userEmail")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userEmail}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password field */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={userData.userPassword}
              isInvalid={!!errors.userPassword}
              onChange={(e) =>
                setUserData({ ...userData, userPassword: e.target.value })
              }
              onBlur={() => handleBlur("userPassword")}
            />
            <Form.Text className="text-muted">
              Your password must be at least 8 characters long, contain at least
              one uppercase letter, one lowercase letter, one digit, and one
              special character (!@#$%^&*()).
            </Form.Text>
            {errors.userPassword && errors.userPassword.length > 0 && (
              <Form.Control.Feedback type="invalid">
                <ul>
                  {errors.userPassword.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Confirm Password field */}
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={userData.confirmPassword}
              isInvalid={!!errors.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;

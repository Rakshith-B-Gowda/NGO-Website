import React, { useState, useContext } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validation functions
  const validateUsername = (username) => {
    if (!username.trim()) {
      return "Username should not be empty";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password should not be empty";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});
    setError("");

    // Validate inputs
    const usernameError = validateUsername(credentials.username);
    const passwordError = validatePassword(credentials.password);

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
      });
      return;
    }

    try {
      const response = await authService.login(credentials);
      loginUser(response.data);
      navigate("/"); // Redirect to Home after successful login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="p-4 border rounded shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">User Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Username field */}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={credentials.username}
              isInvalid={!!errors.username}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  username: e.target.value,
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password field */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={credentials.password}
              isInvalid={!!errors.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Login
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </Container>
  );
};

export default Login;

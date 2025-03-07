import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Footer from "./components/Common/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EventsAdmin from "./components/Admin/EventsAdmin"; // Import EventsAdmin
import PrivateRoute from "./components/Auth/PrivateRoute";
import Unauthorized from "./components/Common/Unauthorized";
import UserProfile from "./components/User/UserProfile";
import DonationForm from "./components/Donations/DonationForm";
import Events from "./components/Events/Events"; 
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Container className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <EventsAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/donate"
            element={
              <PrivateRoute>
                <DonationForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

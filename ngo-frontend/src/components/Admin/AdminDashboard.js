import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleEventsClick = () => {
    navigate("/admin/events");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100vh", paddingTop: "20px" }}>
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button onClick={handleEventsClick}>Manage Events</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
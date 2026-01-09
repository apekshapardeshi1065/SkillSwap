import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext);

  const styles = {
    sidebar: {
      width: "200px",
      minHeight: "100vh",
      backgroundColor: darkMode ? "#1e293b" : "#f7fafc",
      padding: "20px",
      boxShadow: darkMode
        ? "2px 0 5px rgba(255, 255, 255, 0.1)"
        : "2px 0 5px rgba(0,0,0,0.1)",
      color: darkMode ? "#f1f5f9" : "#2d3748",
    },
    ul: { listStyle: "none", padding: 0 },
    link: {
      textDecoration: "none",
      color: darkMode ? "#f1f5f9" : "#2d3748",
      display: "block",
      padding: "10px 0",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={{ color: darkMode ? "#f1f5f9" : "#2d3748" }}>Menu</h3>
      <ul style={styles.ul}>
        <li>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" style={styles.link}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/skills" style={styles.link}>
            Skills
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

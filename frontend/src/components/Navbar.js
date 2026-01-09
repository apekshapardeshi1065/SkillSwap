// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <nav style={styles.nav}>
//       <div style={styles.logo}>
//         <Link to="/dashboard" style={styles.link}>SkillSwap</Link>
//       </div>
//       <div style={styles.links}>
//         <Link to="/dashboard" style={styles.link}>Dashboard</Link>
//         <Link to="/profile" style={styles.link}>Profile</Link>
//         <Link to="/skills" style={styles.link}>Skills</Link>
//         <Link to="/requests" style={styles.link}>Requests</Link>

//         <button onClick={logoutHandler} style={styles.logout}>Logout</button>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#2d3748",
//     color: "#fff",
//     alignItems: "center"
//   },
//   logo: { fontSize: "20px", fontWeight: "bold" },
//   links: { display: "flex", gap: "15px", alignItems: "center" },
//   link: { color: "#fff", textDecoration: "none" },
//   logout: { background: "red", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }
// };


//   const { darkMode, setDarkMode } = useContext(ThemeContext);

//   return (
//     <button onClick={() => setDarkMode(!darkMode)}>
//       {darkMode ? "☀️" : "🌙"}
//     </button>
//   );


// export default Navbar;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={darkMode ? styles.navDark : styles.nav}>
      <div style={styles.logo}>
        <Link to="/dashboard" style={styles.link}>SkillSwap</Link>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/skills" style={styles.link}>Skills</Link>
        <Link to="/requests" style={styles.link}>Requests</Link>

        {/* 🌙 Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={styles.themeBtn}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={logoutHandler} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#2d3748",
    color: "#fff",
    alignItems: "center"
  },
  navDark: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#1a202c",
    color: "#fff",
    alignItems: "center"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  },
  themeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  }
};

export default Navbar;


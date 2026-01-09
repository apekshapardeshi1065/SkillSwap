import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import "./Skills.css";

const Skills = () => {
  const { darkMode } = useContext(ThemeContext); // Dark mode context
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = (skill = "") => {
    const token = localStorage.getItem("token");
    API.get(`/user/all${skill ? `?skill=${skill}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUsers(res.data))
      .catch(() => alert("Error fetching users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const sendRequest = (toId, skill) => {
    const token = localStorage.getItem("token");
    API.post(
      "/request",
      { to: toId, skill },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => alert(res.data.message))
      .catch(() => alert("Error sending request"));
  };

  return (
    <>
      <Navbar />
      <div className={`skills-page ${darkMode ? "dark" : ""}`}>
        <Sidebar />
        <div className="skills-content">
          <h2>Users & Skills</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="skills-list">
            {users.map((user) => (
              <div key={user._id} className="skill-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
                <div className="skills-badges">
                  {user.skills.length > 0 ? (
                    user.skills.map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="no-skill">No skills yet</span>
                  )}
                </div>
                {user.skills[0] && (
                  <button
                    className="swap-btn"
                    onClick={() => sendRequest(user._id, user.skills[0])}
                  >
                    Request Swap
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;




import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

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

      <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
        <Sidebar />

        <div className="dashboard-content">
          <h2>SkillSwap Dashboard</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search users by skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>
                  Skills:{" "}
                  {user.skills.length > 0
                    ? user.skills.join(", ")
                    : "No skills yet"}
                </p>

                {user.skills[0] && (
                  <button
                    onClick={() =>
                      sendRequest(user._id, user.skills[0])
                    }
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

export default Dashboard;



import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import "./Profile.css";

const Profile = () => {
  const { darkMode } = useContext(ThemeContext); // Dashboard jaisa

  const [user, setUser] = useState({ name: "", email: "", skills: [], avatar: "" });
  const [newSkill, setNewSkill] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  /* ------------------ Fetch user profile ------------------ */
  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.get("/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
        setAvatarPreview(res.data.avatar ? `/uploads/${res.data.avatar}` : "");
      })
      .catch(() => alert("Error fetching profile"));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ------------------ Update name/email ------------------ */
  const updateProfile = () => {
    const token = localStorage.getItem("token");
    API.put(
      "/user/me",
      { name: user.name, email: user.email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => alert("Profile updated"))
      .catch(() => alert("Error updating profile"));
  };

  /* ------------------ Add a new skill ------------------ */
  const addSkill = () => {
    if (!newSkill) return alert("Enter a skill");
    const token = localStorage.getItem("token");

    API.put(
      "/user/skills",
      { skill: newSkill },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        setNewSkill("");
        fetchProfile();
      })
      .catch(() => alert("Error adding skill"));
  };

  /* ------------------ Remove a skill ------------------ */
  const removeSkill = (skill) => {
    const token = localStorage.getItem("token");
    API.delete(`/user/skills/${skill}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchProfile())
      .catch(() => alert("Error removing skill"));
  };

  /* ------------------ Handle avatar file selection ------------------ */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  /* ------------------ Upload avatar ------------------ */
  const uploadAvatar = () => {
    if (!avatarFile) return alert("Select an image first");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    API.put("/user/me/avatar", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(res.data.message);
        fetchProfile();
      })
      .catch(() => alert("Error uploading avatar"));
  };

  return (
    <>
      <Navbar />
      <div className={`profile-page ${darkMode ? "dark" : ""}`} style={{ display: "flex" }}>
        <Sidebar />

        {/* Profile Container */}
        <div className={`profile-container ${darkMode ? "dark" : ""}`}>
          <h2>My Profile</h2>

          {/* Avatar */}
          <div className="avatar-section">
            {avatarPreview && <img src={avatarPreview} alt="avatar" className="avatar-preview" />}
            <input type="file" onChange={handleAvatarChange} />
            <button onClick={uploadAvatar}>Upload Avatar</button>
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <label>Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label>Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <button onClick={updateProfile}>Update Profile</button>
          </div>

          {/* Skills */}
          <div className="profile-skills">
            <h3>Skills</h3>
            <ul>
              {user.skills.map((skill) => (
                <li key={skill}>
                  {skill}{" "}
                  <button onClick={() => removeSkill(skill)} className="remove-btn">
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <input
              placeholder="Add new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button onClick={addSkill}>Add Skill</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

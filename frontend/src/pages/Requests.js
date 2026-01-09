import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import "./Requests.css";


const Requests = () => {
  const { darkMode } = useContext(ThemeContext); // Dark mode context
  const [requests, setRequests] = useState([]);

  // Fetch user's swap requests
  const fetchRequests = () => {
    const token = localStorage.getItem("token");
    API.get("/request/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setRequests(res.data))
      .catch(() => alert("Error fetching requests"));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Accept or reject a request
  const handleAction = (id, action) => {
    const token = localStorage.getItem("token");
    API.put(
      `/request/${id}`,
      { action },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => fetchRequests())
      .catch(() => alert("Error updating request"));
  };

  return (
    <>
      <Navbar />
      <div className={`requests-page ${darkMode ? "dark" : ""}`}>
        <Sidebar />
        <div className="requests-content">
          <h2>My Swap Requests</h2>

          {requests.length === 0 && <p>No requests yet.</p>}

          <div className="requests-list">
            {requests.map((req) => (
              <div key={req._id} className="request-card">
                <div className="request-info">
                  <p>
                    <strong>{req.from.name}</strong> wants to swap{" "}
                    <strong>{req.skill}</strong> with you
                  </p>
                  <p>
                    Status:{" "}
                    <span className={`status ${req.status}`}>{req.status}</span>
                  </p>
                </div>

                {req.status === "pending" && (
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAction(req._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleAction(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;

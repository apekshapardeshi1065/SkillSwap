// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       if (error.response) alert(error.response.data.message);
//       else alert("No response from backend");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={submitHandler}>
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//       <p>No account? <Link to="/register">Register here</Link></p>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css"; // We'll create this file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;




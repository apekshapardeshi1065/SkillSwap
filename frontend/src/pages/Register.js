// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await API.post("/auth/register", {
//       name,
//       email,
//       password,
//     });
//     console.log("Register response:", data); // <-- add this
//     alert(data.message || "Registration successful");
//     navigate("/");
//   } catch (error) {
//     console.error("Register error:", error); // <-- add this
//     if (error.response) {
//       console.log("Error response data:", error.response.data);
//       alert(error.response.data.message || "Backend error");
//     } else if (error.request) {
//       console.log("No response received:", error.request);
//       alert("No response from backend");
//     } else {
//       console.log("Axios setup error:", error.message);
//       alert("Something went wrong");
//     }
//   }
// };


//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <h2>Register</h2>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>

//       <p>
//         Already have an account? <Link to="/">Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css"; // Same CSS file as Login

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      alert(data.message || "Registration successful");
      navigate("/"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler} className="auth-form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;








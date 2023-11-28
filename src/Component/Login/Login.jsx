import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LoginStyle.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", role: ""});
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	try {
	  let loginApiEndpoint = "";
	  if (role === "user") {
		loginApiEndpoint = "http://localhost:3000/user/login";
		console.log("User Api is calling")

	  } else if (role === "admin") {
		loginApiEndpoint = "http://localhost:3000/admin/login"; // Adjust the actual admin login endpoint
		console.log("Admin Api is calling")

	  }
  
	  const response = await fetch(loginApiEndpoint, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({
		  email: data.email,
		  Password: data.password,
		  role: role,
		}),
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  const responseData = await response.json();
  
	  if (responseData.Success === true) {
		console.log(responseData);
  
		localStorage.setItem("token", responseData.token);
		if(role === 'user')
		navigate("/user/posts");
		else{
		navigate("/admin/posts")
		}
	  } else {
		console.log(responseData.Message);
	  }
	} catch (error) {
	  console.error(error);
	  setError("An error occurred during login. Please try again.");
	}
  };
  

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="lleft">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            <div className="role_radio_group">
              <label>
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => handleRoleChange("user")}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => handleRoleChange("admin")}
                />
                Admin
              </label>
            </div>
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="rright">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

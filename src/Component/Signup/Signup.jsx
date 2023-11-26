import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupStyle.css";

const Signup = () => {
  const [data, setData] = useState({
    FullName: "",
    email: "",
    Password: "",
    role: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: data.FullName,
          email: data.email,
          Password: data.Password,
          role: data.role
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Assuming you have a navigate function to handle navigation
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <input type="text" placeholder="Full Name" name="FullName" onChange={handleChange} value={data.FullName}
              required
              className="input"
            />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email}
              required
              className="input"
            />
            <input type="password" placeholder="Password" name="Password" onChange={handleChange} value={data.Password}
              required
              className="input"
            />

            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={data.role === "user"}
                  onChange={handleChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={data.role === "admin"}
                  //onChange={handleChange}
                />
                Admin
              </label>
            </div>



            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginStyle.css"
import { useNavigate  } from "react-router-dom";	

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
    const navigate = useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
        
		try {
            fetch("http://localhost:3000/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: data.email,
                Password: data.password,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                if(data.Success === true)
                {
                    console.log(data);
                    
                    localStorage.setItem("token", data.token)
                    navigate("/posts")
                }
                else{
                    console.log(data.Message)
                }
                
              })
              .catch((error) => {
                console.error(error);
                setError("An error occurred during login. Please try again.");
              });
          } catch (error) {
            console.error(error);
            setError("An error occurred during login. Please try again.");
          }
          
		}


	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className = "lleft">
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
import { useState, useRef } from "react";
import { Button } from "../Components";
import { Link } from "react-router-dom";

const DEFAULT_CREDENTIALS = {
	email: "",
	password: "",
};

const Login = () => {
	const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
	const passwordElementRef = useRef(null);

	const togglePasswordView = () => {
		if (passwordElementRef.current.type === "password") {
			passwordElementRef.current.type = "text";
		} else {
			passwordElementRef.current.type = "password";
		}
	};

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setCredentials(prev => ({ ...prev, [name]: value }));
	};

	return (
		<div className="centered">
			<div className="center-container bg-white">
				<h1>Login</h1>
				<form className="form">
					<div className="field">
						<label>Email</label>
						<input
							type="email"
							placeholder="eg: abc@test.com"
							name="email"
							value={credentials.email}
							onChange={handleChange}
						/>
					</div>
					<div className="field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							ref={passwordElementRef}
							value={credentials.password}
							onChange={handleChange}
						/>
						<span onClick={togglePasswordView}>Show Password</span>
					</div>
					<Button label="Login" color="dark" btnStyle="contained" size="block" />
				</form>
			</div>
			<div>
				New to Blog App? <Link to="/signup">Sign-up</Link>
			</div>
		</div>
	);
};

export default Login;

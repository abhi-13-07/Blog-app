import { useState, useRef } from "react";
import { Button } from "../Components";
import { Link } from "react-router-dom";

const DEFAULT_CREDENTIALS = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Signup = () => {
	const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
	const passwordElementRef = useRef(null);
	const confirmPasswordElementRef = useRef(null);

	const togglePasswordView = () => {
		if (passwordElementRef.current.type === "password") {
			passwordElementRef.current.type = "text";
			confirmPasswordElementRef.current.type = "text";
		} else {
			passwordElementRef.current.type = "password";
			confirmPasswordElementRef.current.type = "password";
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
				<h1>Register</h1>
				<form className="form">
					<div className="field">
						<label>Name</label>
						<input
							type="text"
							placeholder="eg: abc"
							name="name"
							value={credentials.name}
							onChange={handleChange}
						/>
					</div>
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
					</div>
					<div className="field">
						<label>Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							ref={confirmPasswordElementRef}
							value={credentials.confirmPassword}
							onChange={handleChange}
						/>
						<span onClick={togglePasswordView}>Show Password</span>
					</div>
					<Button label="Signup" color="dark" btnStyle="contained" size="block" />
				</form>
			</div>
			<div>
				Aready have an account? <Link to="/login">Log-in</Link>
			</div>
		</div>
	);
};

export default Signup;

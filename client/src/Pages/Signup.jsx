import { useState, useRef } from "react";
import { Button, Input } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../Hooks/useTitle";
import { signup } from "../Actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const DEFAULT_CREDENTIALS = {
	username: "",
	email: "",
	password1: "",
	password2: "",
};

const Signup = () => {
	const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
	const passwordElementRef = useRef(null);
	const confirmPasswordElementRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector(state => state.auth);

	const { username, email, password1, password2 } = credentials;
	const isEmptyForm = !username || !email || !password1 || !password2;

	useTitle("Signup");

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setCredentials(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(signup(credentials, () => navigate("/")));
	};

	return (
		<div className="centered">
			<div className="center-container bg-white">
				<h1>Signup</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div className="field">
						<label>Username</label>
						<Input
							type="text"
							placeholder="eg: abc"
							name="username"
							value={credentials.username}
							onChange={handleChange}
							disabled={loading}
						/>
						{error?.username && <p>{error.username[0]}</p>}
					</div>
					<div className="field">
						<label>Email</label>
						<Input
							type="email"
							placeholder="eg: abc@test.com"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							disabled={loading}
						/>
						{error?.email && <p>{error.email[0]}</p>}
					</div>
					<div className="field">
						<label>Password</label>
						<Input
							type="password"
							name="password1"
							ref={passwordElementRef}
							value={credentials.password}
							onChange={handleChange}
							disabled={loading}
						/>
						{error?.password1 && <p>{error.password1[0]}</p>}
					</div>
					<div className="field">
						<label>Confirm Password</label>
						<Input
							type="password"
							name="password2"
							ref={confirmPasswordElementRef}
							value={credentials.confirmPassword}
							onChange={handleChange}
							disabled={loading}
						/>
						{error?.password2 && <p>{error.password2[0]}</p>}
					</div>
					<Button
						label="Signup"
						color="dark"
						btnStyle="contained"
						size="block"
						disabled={isEmptyForm || loading}
					/>
				</form>
			</div>
			<div>
				Aready have an account? <Link to="/login">Log-in</Link>
			</div>
		</div>
	);
};

export default Signup;

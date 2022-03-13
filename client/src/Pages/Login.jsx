import { useState } from "react";
import { Button, Input } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../Hooks/useTitle";
import { loginUser } from "../Actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const DEFAULT_CREDENTIALS = {
	username: "",
	password: "",
};

const Login = () => {
	const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
	const { loading, error } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { username, password } = credentials;
	const isEmptyForm = !username || !password;

	useTitle("Login");

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setCredentials(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loginUser(credentials, () => navigate(-1)));
	};

	return (
		<div className="centered">
			<div className="center-container bg-white">
				<h1>Login</h1>
				<div className="error">
					<p>{error && error.detail}</p>
				</div>
				<form className="form" onSubmit={handleSubmit}>
					<div className="field">
						<label>Username</label>
						<Input
							type="text"
							name="username"
							value={credentials.username}
							onChange={handleChange}
						/>
					</div>
					<div className="field">
						<label>Password</label>
						<Input
							type="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
						/>
					</div>
					<Button
						label="Login"
						color="dark"
						btnStyle="contained"
						size="block"
						disabled={isEmptyForm || loading}
					/>
				</form>
			</div>
			<div>
				New to Blog App? <Link to="/signup">Sign-up</Link>
			</div>
		</div>
	);
};

export default Login;

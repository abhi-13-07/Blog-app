import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RestrictAuth = ({ children }) => {
	const { accessToken } = useSelector(state => state.auth);
	const isAuth = !!accessToken;

	return !isAuth ? children : <Navigate to="/" />;
};

export default RestrictAuth;

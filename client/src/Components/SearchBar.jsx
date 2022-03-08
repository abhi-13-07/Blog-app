import { useEffect, createRef } from "react";
import Input from "./Input";

const SearchBar = ({ onSubmit }) => {
	const inputRef = createRef();
	useEffect(() => {
		const handleKeyPress = e => {
			if (e.key === "/" && e.ctrlKey) {
				inputRef.current.focus();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [inputRef]);

	return (
		<div className="search-bar">
			<form onSubmit={onSubmit}>
				<Input
					type="search"
					placeholder={'Search anything press "ctrl + /" to search'}
					ref={inputRef}
				/>
			</form>
		</div>
	);
};

export default SearchBar;

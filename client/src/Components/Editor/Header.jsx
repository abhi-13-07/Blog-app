import React from "react";
import { useEditor } from "./Context/EditorProvider";

const Header = ({ togglePreview }) => {
	const { formatText } = useEditor();

	const handleClick = e => {
		e.preventDefault();
		const { id } = e.target;
		const textarea = document.querySelector("textarea");
		formatText(id, textarea);
	};

	return (
		<header className="editor-header">
			<div className="header-button-container">
				<div className="group">
					<button id="bold" className="header-buttons bold" onClick={handleClick}>
						B
					</button>
					<button id="italic" className="header-buttons italic" onClick={handleClick}>
						I
					</button>
					<button id="code" className="header-buttons" onClick={handleClick}>
						&lt;&nbsp;/&nbsp;&gt;
					</button>
				</div>

				<div className="group">
					<button id="h1" className="header-buttons" onClick={handleClick}>
						H1
					</button>
					<button id="h2" className="header-buttons" onClick={handleClick}>
						H2
					</button>
					<button id="h3" className="header-buttons" onClick={handleClick}>
						H3
					</button>
				</div>

				<div className="group">
					<button id="link" className="header-buttons">
						<i className="fa-solid fa-link" id="link" onClick={handleClick}></i>
					</button>

					<button id="image" className="header-buttons">
						<i className="fa-solid fa-image" id="image" onClick={handleClick}></i>
					</button>
				</div>
			</div>

			<div className="header-utils">
				<button id="info" className="header-buttons" onClick={handleClick}>
					<i className="fa-solid fa-circle-info"></i>
				</button>
				<button id="preview" className="header-buttons" onClick={togglePreview}>
					Preview
				</button>
			</div>
		</header>
	);
};

export default Header;

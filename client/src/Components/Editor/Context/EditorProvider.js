import { createContext, useContext, useState, useEffect, useCallback } from "react";

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children, value = "", onChange }) => {
	const [text, setText] = useState(value);

	useEffect(() => {
		onChange(text);
	}, [text, onChange]);

	const updateText = t => {
		setText(t);
	};

	const formatText = useCallback((type, textarea) => {
		const { selectionStart: start, selectionEnd: end } = textarea;
		let text = textarea.value.substring(start, end);

		let formattedText = "";

		switch (type) {
			case "bold":
				if (!text) {
					formattedText = `**Your Text Here**`;
				} else {
					formattedText = `**${text}**`;
				}
				break;
			case "italic":
				if (!text) {
					formattedText = "_Your Text Here_";
				} else {
					formattedText = `_${text}_`;
				}
				break;
			case "code":
				// eslint-disable-next-line no-useless-concat
				formattedText = "```\n" + text + "\n```";
				break;
			case "h1":
				formattedText = `# ${text}`;
				break;
			case "h2":
				formattedText = `## ${text}`;
				break;
			case "h3":
				formattedText = `### ${text}`;
				break;
			case "image":
				formattedText = `![alternate text](image link)`;
				break;
			case "link":
				formattedText = `[text](link)`;
				break;
			default:
				formattedText = text;
		}

		textarea.setRangeText(formattedText, start, end, "end");
		updateText(textarea.value);
		textarea.focus();
	}, []);

	const textAreaRef = useCallback(
		element => {
			const handleKeyDown = e => {
				const { key, ctrlKey } = e;
				const self = e.target;

				if (key === "Tab") {
					e.preventDefault();
					const { selectionStart: start, selectionEnd: end } = self;
					self.setRangeText("\t", start, end, "end");
				}

				if (ctrlKey && key === "b") {
					e.preventDefault();
					formatText("bold", self);
				}

				if (ctrlKey && key === "i") {
					e.preventDefault();
					formatText("italic", self);
				}

				if (ctrlKey && key === "C") {
					e.preventDefault();
					formatText("code", self);
				}
			};

			if (element) {
				element.removeEventListener("keydown", handleKeyDown);

				element.addEventListener("keydown", handleKeyDown);
			}
		},
		[formatText]
	);

	return (
		<EditorContext.Provider value={{ text, updateText, textAreaRef, formatText }}>
			{children}
		</EditorContext.Provider>
	);
};

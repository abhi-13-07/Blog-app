import { marked } from "marked";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

export const parseMarkdown = src => {
	marked.setOptions({
		headerIds: true,
		// gfm: true,
		highlight: function (code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			return hljs.highlight(code, { language }).value;
		},
		langPrefix: "hljs language-",
	});
	const html = marked.parse(src);
	const cleanHtml = DOMPurify.sanitize(html, { ALLOWED_ATTR: ["class", "id", "src", "href"] });
	return cleanHtml;
};

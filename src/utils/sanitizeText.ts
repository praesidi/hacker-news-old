import DOMPurify from 'dompurify';

const sanitizeText = (text: string) => {
	return DOMPurify.sanitize(text);
};

export default sanitizeText;

const getShortLink = (url: string) => {
	const pattern =
		/^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/;

	const result = url.match(pattern) || [];

	return result[1];
};

export default getShortLink;

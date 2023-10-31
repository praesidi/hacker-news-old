const convertTime = (seconds: number) => {
	const timePassed = Math.round(Date.now() / 1000) - seconds;
	const timeInMinutes = Math.round(timePassed / 60);
	const timeInHours = Math.round(timeInMinutes / 60);
	const timeInDays = Math.round(timeInHours / 24);

	if (timeInDays >= 1 && timeInDays < 2) {
		return `${timeInDays} day`;
	} else if (timeInDays > 1) {
		return `${timeInDays} days`;
	}

	if (timeInHours >= 1 && timeInHours < 2) {
		return `${timeInHours} hour`;
	} else if (timeInHours > 1) {
		return `${timeInHours} hours`;
	}

	if (timeInMinutes === 1) {
		return `${timeInMinutes} minute`;
	} else {
		return `${timeInMinutes} minutes`;
	}
};

export default convertTime;

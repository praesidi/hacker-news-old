import styles from './StoryCard.module.sass';

export interface IStoryData {
	by: string;
	descendants: number;
	id: number;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

function StoryCard({ story, index }: { story: IStoryData; index: number }) {
	const getTime = (seconds: number) => {
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

	const getShortLink = (url: string) => {
		if (!url) return 'link not provided';

		const pattern =
			/^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/;

		const result = url.match(pattern) || [];

		return result[1];
	};

	return (
		<div className={styles.container}>
			<div style={{ marginRight: '10px', fontWeight: 900, width: '30px' }}>
				{index + 1}
			</div>
			<div>
				<div className={styles['title-container']}>
					<h4
						onClick={() => {
							console.log('link used');
						}}
						className={styles.title}
					>
						{story.title}
					</h4>
					<span className={styles.link}>
						<a href={story.url} target='_blank'>
							({getShortLink(story.url)})
						</a>
					</span>
				</div>
				<div>
					{story.score === 1
						? `${story.score} point by `
						: `${story.score} points by `}
					<span className={styles.by}>{story.by}</span>{' '}
					{`${getTime(story.time)} ago`}
				</div>
			</div>
		</div>
	);
}

export default StoryCard;

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
	return (
		<div className={styles.container}>
			<div>{index + 1}|</div>
			<div>{story.score}^</div>
			<div>
				<h4>{story.title}</h4>
			</div>
		</div>
	);
}

export default StoryCard;

import StoryCard from '../StoryCard/StoryCard';
import { IStoryData } from '../StoryCard/StoryCard';
import styles from './Stories.module.sass';

function Stories({ data }: { data: IStoryData[] | null }) {
	return (
		<div className={styles.container}>
			<h1>100 latest stories</h1>
			{data === null ? (
				<h1>Nothing to see here, lol</h1>
			) : (
				data.map((story: IStoryData, i: number) => (
					<StoryCard key={i} story={story} index={i} />
				))
			)}
		</div>
	);
}

export default Stories;

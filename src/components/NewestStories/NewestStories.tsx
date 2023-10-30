import { IStoryData } from '../StoryCard/StoryCard';
import StoryCard from '../StoryCard/StoryCard';

function Stories({ data }: { data: IStoryData[] | null }) {
	console.log(data);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10px',
				marginBottom: '50px',
				width: '100%',
			}}
		>
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

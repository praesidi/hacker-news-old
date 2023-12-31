import styles from './StoryCard.module.sass';
import { Link } from 'react-router-dom';
import getShortLink from '../../utils/getShortLink';
import convertTime from '../../utils/convertTime';
export interface IStoryData {
	by?: string;
	descendants?: number;
	id: number;
	kids?: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url?: string;
	text?: string;
}

// TODO: line 25: check why id randomly causes errors

function StoryCard({ story, index }: { story: IStoryData; index: number }) {
	if (!story.id) return <div>error</div>;

	return (
		<div className={styles['container']}>
			<div style={{ marginRight: '10px', fontWeight: 900, width: '30px' }}>
				{index + 1}
			</div>
			<div>
				<div className={styles['title-container']}>
					<Link to={`./story/${story.id}`} className={styles['title']}>
						{story.title}
					</Link>
					<a href={story.url} className={styles['source-link']} target='_blank'>
						({story.url ? getShortLink(story.url) : 'link not provided'})
					</a>
				</div>
				<div>
					{story.score === 1
						? `${story.score} point by `
						: `${story.score} points by `}
					<span className={styles['by']}>{story.by}</span>{' '}
					{story.time ? `${convertTime(story.time)} ago` : ''}
				</div>
			</div>
		</div>
	);
}

export default StoryCard;

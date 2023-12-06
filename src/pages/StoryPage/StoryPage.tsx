import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { IStoryData } from '../../components/StoryCard/StoryCard';
import useFetchStory from '../../hooks/useFetchStory';
import getShortLink from '../../utils/getShortLink';
import convertTime from '../../utils/convertTime';
import ScoreCounter from '../../components/UI/ScoreCounter/ScoreCounter';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import styles from './StoryPage.module.sass';
import sanitizeText from '../../utils/sanitizeText';
import CommentTree from '../../components/CommentTree/CommentTree';

function StoryPage() {
	const params = useParams();
	const { data, isLoading } = useFetchStory(
		`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`,
	);

	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.main}>
				<div className={styles['btn-container']}>
					<Link to={'/'} style={{ textDecoration: 'none' }}>
						<Button text={'back'}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='50px'
								height='50px'
								viewBox='0 0 512 512'
							>
								<polyline
									points='244 400 100 256 244 112'
									style={{
										fill: 'none',
										stroke: '#000000',
										strokeLinecap: 'round',
										strokeLinejoin: 'round',
										strokeWidth: '32px',
									}}
								/>
								<line
									x1='120'
									y1='256'
									x2='412'
									y2='256'
									style={{
										fill: 'none',
										stroke: '#000000',
										strokeLinecap: 'round',
										strokeLinejoin: 'round',
										strokeWidth: '32px',
									}}
								/>
							</svg>
						</Button>
					</Link>
				</div>
				{isLoading ? <Loader /> : <Story data={data} />}
			</main>
			<Footer />
		</div>
	);
}

function Story({ data }: { data: IStoryData | null }) {
	const [refetch, setRefetch] = useState<boolean>(true);

	const cleanText = data?.text ? sanitizeText(data.text) : '';
	const date = data?.time ? convertTime(data.time) : '';

	if (!data) throw 'data is null';

	return (
		<div className={styles['story-container']}>
			<div className={styles['story-info-container']}>
				<ScoreCounter fontSize={'24px'}>
					{data?.score ? data?.score : 0}
				</ScoreCounter>
				<div>
					{data.url ? (
						<a href={`${data.url}`} className={styles['link']} target='_blank'>
							{`${getShortLink(data?.url)}`}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='12px'
								height='12px'
								viewBox='0 0 24 24'
								fill='none'
								style={{ marginLeft: '3px' }}
							>
								<g xmlns='http://www.w3.org/2000/svg'>
									<g>
										<path
											d='M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11'
											stroke='darkgrey'
											strokeWidth='2.4'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</g>
								</g>
							</svg>
						</a>
					) : (
						'link not provided'
					)}
					<h1>{data?.title}</h1>
					<span className={styles['by']}>
						posted by <span className={styles['username']}>{data?.by}</span>{' '}
						{`${date}`} ago
					</span>
				</div>
			</div>
			<div className={styles['story-text-container']}>
				<p dangerouslySetInnerHTML={{ __html: cleanText }}></p>
			</div>
			{/* comment section */}
			<div className={styles['comment-tree-container']}>
				<div className={styles['comment-tree-header']}>
					<h2>
						{data?.descendants}{' '}
						{data?.descendants === 1 ? 'Comment' : 'Comments'}
					</h2>
					<Button
						onClick={() => {
							setRefetch(!refetch);
						}}
						isRound={true}
						isSpinning={true}
					>
						<path d='M 25 2 A 2.0002 2.0002 0 1 0 25 6 C 35.517124 6 44 14.482876 44 25 C 44 35.517124 35.517124 44 25 44 C 14.482876 44 6 35.517124 6 25 C 6 19.524201 8.3080175 14.608106 12 11.144531 L 12 15 A 2.0002 2.0002 0 1 0 16 15 L 16 4 L 5 4 A 2.0002 2.0002 0 1 0 5 8 L 9.5253906 8 C 4.9067015 12.20948 2 18.272325 2 25 C 2 37.678876 12.321124 48 25 48 C 37.678876 48 48 37.678876 48 25 C 48 12.321124 37.678876 2 25 2 z'></path>
					</Button>
				</div>
				{data.kids && data.kids.length > 0 ? (
					<CommentTree id={data.id} />
				) : (
					<div>There is no comments yet</div>
				)}
			</div>
		</div>
	);
}

export default StoryPage;

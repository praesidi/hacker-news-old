import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/UI/Button/Button';
import useFetchAllStories from '../../hooks/useFetchAllStories';
import StoryCard from '../../components/StoryCard/StoryCard';
import Loader from '../../components/UI/Loader/Loader';
import styles from './MainPage.module.sass';
import { IStoryData } from '../../components/StoryCard/StoryCard';
import { useState } from 'react';

function MainPage() {
	const [refetch, setRefetch] = useState<boolean>(true);

	const fetchURL = `https://hacker-news.firebaseio.com/v0/newstories/.json?print=pretty&orderBy=%22$key%22&limitToFirst=100`;

	const { data, isLoading, error } = useFetchAllStories(fetchURL, refetch);

	if (error) {
		return (
			<div className={styles.container}>
				<h1>Something went wrong. Try again!</h1>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.main}>
				<div className={styles['restart-btn-container']}>
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
				{isLoading ? <Loader /> : <Stories data={data} />}
			</main>
			<Footer />
		</div>
	);
}

function Stories({ data }: { data: IStoryData[] | null }) {
	return (
		<div className={styles['stories-container']}>
			<h1>100 latest stories</h1>
			{data === null ? (
				<h1>Nothing found. Try Again</h1>
			) : (
				data.map((story: IStoryData, i: number) => (
					<StoryCard key={i} story={story} index={i} />
				))
			)}
		</div>
	);
}

export default MainPage;

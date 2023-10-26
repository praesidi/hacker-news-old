/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RestartButton from '../../components/UI/RestartButton/RestartButton';
import useFetchStories from '../../hooks/useFetchStories';
import NewestStories from '../../components/NewestStories/NewestStories';
import styles from './MainPage.module.sass';
import Loader from '../../components/UI/Loader/Loader';
import { useState } from 'react';

function MainPage() {
	const [refetch, setRefetch] = useState<boolean>(true);

	const fetchURL = `https://hacker-news.firebaseio.com/v0/newstories/.json?print=pretty&orderBy=%22$key%22&limitToFirst=100`;

	const { data, isLoading, error } = useFetchStories(fetchURL, refetch);

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
					<RestartButton
						onClick={() => {
							setRefetch(!refetch);
						}}
					/>
				</div>
				{/* <Loader /> */}
				{isLoading ? <Loader /> : <NewestStories data={data} />}
			</main>
			<Footer />
		</div>
	);
}

export default MainPage;

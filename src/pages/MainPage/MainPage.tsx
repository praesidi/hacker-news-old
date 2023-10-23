import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RestartButton from '../../components/UI/RestartButton/RestartButton';
import StoryCard from '../../components/StoryCard/StoryCard';
import styles from './MainPage.module.sass';

function MainPage() {
	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.main}>
				<div className={styles['restart-btn-container']}>
					<RestartButton
						onClick={() => {
							console.log('refetch');
						}}
					/>
				</div>
				<StoryCard />
			</main>
			<Footer />
		</div>
	);
}

export default MainPage;

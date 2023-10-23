import Logo from '../UI/Logo/Logo';
import styles from './Footer.module.sass';

function Footer() {
	return (
		<footer className={styles.container}>
			<div className={styles.credits}>
				<span>
					Powered by{' '}
					<a
						href='https://github.com/HackerNews/API'
						target='_blank'
						className={styles.link}
					>
						Hacker News API
					</a>
				</span>
				<span>
					Designed and created by{' '}
					<a
						href='https://github.com/praesidi'
						target='_blank'
						className={styles.link}
					>
						praesidi
					</a>
				</span>
			</div>
			<div className={styles['logo-container']}>
				<Logo logoHeight={20} color='black' gap={2} />
			</div>
		</footer>
	);
}

export default Footer;

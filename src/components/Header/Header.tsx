import Logo from '../UI/Logo/Logo';
import styles from './Header.module.sass';

function Header() {
	return (
		<header className={styles.container}>
			<Logo color='white' />
		</header>
	);
}

export default Header;

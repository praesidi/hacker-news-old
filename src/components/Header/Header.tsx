import Logo from '../UI/Logo/Logo';
import styles from './Header.module.sass';

function Header() {
	return (
		<header className={styles.container}>
			<Logo color='black' fontSize={20} />
		</header>
	);
}

export default Header;

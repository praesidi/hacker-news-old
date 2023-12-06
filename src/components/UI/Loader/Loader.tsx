import styles from './Loader.module.sass';

function Loader() {
	return (
		<div className={styles['container']}>
			<span className={styles.loader}></span>
		</div>
	);
}

export default Loader;

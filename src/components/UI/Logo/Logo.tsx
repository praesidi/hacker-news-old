import logo from '../../../assets/images/logo.png';
import styles from './Logo.module.sass';

interface ILogoProps {
	position?: 'left' | 'right';
	fontSize?: number;
	logoHeight?: number;
	color?: 'white' | 'black';
	gap?: number;
}

export default function Logo({
	position = 'left',
	gap = 12,
	fontSize = 16,
	logoHeight = 50,
	color = 'black',
}: ILogoProps) {
	const textStyle = {
		display: 'flex',
		justifyContent: 'center',
		gap: `${gap}px`,
		fontSize: `${fontSize}px`,
	};

	const imgStyle = {
		height: `${logoHeight}px`,
		filter: '',
	};

	if (color === 'white') {
		imgStyle.filter = 'invert(1)';
	} else {
		imgStyle.filter = '';
	}

	return (
		<>
			{position === 'left' ? (
				<div className={styles.container} style={textStyle}>
					<img src={logo} alt='logo' style={imgStyle} />
					<span>Hacker News</span>
				</div>
			) : (
				<div className={styles.container} style={textStyle}>
					<span>Hacker News</span>
					<img src={logo} alt='logo' style={imgStyle} />
				</div>
			)}
		</>
	);
}

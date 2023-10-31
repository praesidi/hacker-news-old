import styles from './Button.module.sass';
import { ReactElement } from 'react';

interface IButton {
	children: ReactElement | undefined;
	onClick?: () => void;
	isRound?: boolean;
	isSpinning?: boolean;
	text?: string;
}

function Button({
	onClick,
	isRound = false,
	isSpinning = false,
	children,
	text,
}: IButton) {
	const isAnimated = isSpinning ? `${styles.spinning}` : '';
	const CSSClasses = isRound
		? `${styles.button} ${styles.round} ${isAnimated}`
		: `${styles.button}`;

	return (
		<button className={CSSClasses} onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				width='25'
				height='25'
				viewBox='0 0 50 50'
			>
				{children}
			</svg>
			{text ? <span className={styles.text}>{text}</span> : ''}
		</button>
	);
}

export default Button;

import styles from './Button.module.sass';
import { ReactElement } from 'react';

interface IButton {
	children: string | ReactElement;
	onClick?: () => void;
	isRound?: boolean;
	isSpinning?: boolean;
}

function Button({
	onClick,
	isRound = false,
	isSpinning = false,
	children,
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
		</button>
	);
}

export default Button;

import { useState } from 'react';
import convertTime from '../../utils/convertTime';
import sanitizeText from '../../utils/sanitizeText';
import styles from './CommentTree.module.sass';
import useFetchAllComments from '../../hooks/useFetchAllComments';
import Loader from '../UI/Loader/Loader';

export interface IComment {
	id: number;
	by: string;
	text: string;
	time: string;
	kids?: number[];
}

interface ICommentTreeProps {
	id: number;
	// depth?: number;
}

//TODO: fetch all comments in hook
function CommentTree({ id }: ICommentTreeProps) {
	const { comments, isLoading, error } = useFetchAllComments(id);
	// const depth = useRef(0);

	if (error) return <div>Error</div>;

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles['comment-tree']}>
					{comments?.map((comment: IComment, index: number) => (
						<Comment key={index} data={comment} />
					))}
				</div>
			)}
		</>
	);
}

function Comment({ data }: { data: IComment }) {
	const [isNestedShown, setIsNestedShown] = useState<boolean>(false);
	const word = data?.kids?.length === 1 ? 'comment' : 'comments';
	const cleanText = data?.text ? sanitizeText(data.text) : '';

	return (
		<div className={styles['comment-container']}>
			<div className={styles['info']}>
				<span className={styles.by}>{data.by}</span>
				<span className={styles.time}>{`${convertTime(
					Number(data.time),
				)} ago`}</span>
			</div>
			<div
				className={styles['text']}
				dangerouslySetInnerHTML={{ __html: cleanText }}
			></div>
			{data.kids && !isNestedShown ? (
				<div
					className={styles['btn']}
					onClick={() => {
						setIsNestedShown(true);
					}}
				>
					{data.kids.length} {word}
				</div>
			) : (
				<></>
			)}
			{data.kids && data.kids.length > 0 ? (
				<div style={{ display: isNestedShown ? '' : 'none' }}>
					{data.kids?.map((kid, index) => <CommentTree key={index} id={kid} />)}
				</div>
			) : null}
		</div>
	);
}

export default CommentTree;

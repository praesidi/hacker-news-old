// import { IStoryData } from '../components/StoryCard/StoryCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IComment } from '../components/CommentTree/CommentTree';

// interface Comment {
// 	id: number;
// 	text: string;
// }

export default function useFetchAllComments(storyId: number) {
	const [comments, setComments] = useState<IComment[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				setIsLoading(true);

				const response = await axios.get(
					`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
				);
				if (response.status !== 200) {
					throw new Error('Failed to fetch comments');
				}

				const story = response.data;
				const commentIds: number[] = story.kids;

				if (story.kids && story.kids.length > 0) {
					const commentPromises = commentIds.map(async (commentId) => {
						const commentResponse = await axios.get(
							`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
						);
						if (commentResponse.status !== 200) {
							throw new Error('Failed to fetch comment');
						}
						return commentResponse.data;
					});

					const fetchedComments = await Promise.all(commentPromises);
					setComments(fetchedComments);
				}
				setIsLoading(false);
			} catch (error) {
				let errorMessage = 'Failed to do something exceptional';
				if (error instanceof Error) {
					setError(error.message);
					errorMessage = error.message;
				}
				console.log(errorMessage);
				setIsLoading(false);
			}
		};

		fetchComments();
	}, [storyId]);

	return { comments, isLoading, error };
}

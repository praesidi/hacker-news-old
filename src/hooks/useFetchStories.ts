import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export interface IPostData {
	by: string;
	descendants: number;
	id: number;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

export default function useFetchStories(url: string) {
	const [data, setData] = useState<IPostData[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AxiosError | null>(null);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	axios
	// 		.get(url)
	// 		.then((response) => {
	// 			setData(response.data);
	// 			console.log(response.data);
	// 		})
	// 		// .then((response) => {
	// 		// 	response.map((postID: number) => {
	// 		// 		axios
	// 		// 			.get(`https://hacker-news.firebaseio.com/v0/item/${postID}.json?print=pretty`)
	// 		// 			.then(setData([...data, response]))
	// 		// 	})
	// 		// 	setData(response.data);
	// 		// })
	// 		.catch((err) => {
	// 			setError(err);
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// }, [url]);

	useEffect(() => {
		setIsLoading(true);
		async function getData() {
			try {
				setIsLoading(true);
				const response = await axios.get(url);
				// console.log(response.data);
				const promises = await response.data.map((id: number) =>
					axios
						.get(
							`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
						)
						.then((response) => response.data),
				);
				const result = await Promise.all(promises);
				// console.log(result);
				setData(result);
				setIsLoading(false);
			} catch (error) {
				const err = error as AxiosError;
				setError(err);
				// console.log(err.response?.data);
			}
		}
		getData();
	}, [url]);
	return { data, isLoading, error };
}

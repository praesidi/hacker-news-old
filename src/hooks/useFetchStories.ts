import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IStoryData } from '../components/StoryCard/StoryCard';

export default function useFetchStories(url: string, refetch: boolean) {
	const [data, setData] = useState<IStoryData[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AxiosError | null>(null);

	useEffect(() => {
		setIsLoading(true);
		async function getData() {
			try {
				setIsLoading(true);
				const response = await axios.get(url);
				const promises = await response.data.map((id: number) =>
					axios
						.get(
							`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
						)
						.then((response) => response.data),
				);
				const result = await Promise.all(promises);
				setData(result);
				setIsLoading(false);
			} catch (error) {
				const err = error as AxiosError;
				setError(err);
			}
		}

		getData();

		const interval = setInterval(getData, 300000);

		return () => clearInterval(interval);
	}, [url, refetch]);

	return { data, isLoading, error };
}

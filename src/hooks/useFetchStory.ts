import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IStoryData } from '../components/StoryCard/StoryCard';

export default function useFetchStory(url: string) {
	const [data, setData] = useState<IStoryData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AxiosError | null>(null);

	useEffect(() => {
		setIsLoading(true);
		async function getData() {
			try {
				const response = await axios.get(url);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				const err = error as AxiosError;
				setError(err);
			}
		}
		getData();
	}, [url]);

	return { data, isLoading, error };
}

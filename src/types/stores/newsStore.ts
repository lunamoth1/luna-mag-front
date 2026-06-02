import { NewsItem } from "../api/news";

export interface NewsState {
	news: NewsItem[];
	isLoading: boolean;
	setNews: (news: NewsItem[]) => void;
	setIsLoading: (isLoading: boolean) => void;
}

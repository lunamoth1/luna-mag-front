export interface NewsItem {
	id: number;
	documentId?: string;
	title: string;
	text: string;
	featured: boolean;
	createdAt?: string;
}

export interface EditNewsItem {
	title: string;
	text: string;
	featured: boolean;
}

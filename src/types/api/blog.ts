export interface BlogPost {
	id: number;
	documentId?: string;
	title: string;
	text: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface EditBlogPost {
	title: string;
	text: string;
}

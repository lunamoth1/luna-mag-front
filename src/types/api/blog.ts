export interface BlogImage {
	id: string;
	fileId: number;
	description: string;
	url?: string;
}

export interface BlogPost {
	id: number;
	documentId?: string;
	title: string;
	text: string;
	images?: BlogImage[];
	createdAt?: string;
	updatedAt?: string;
}

export interface EditBlogPost {
	title: string;
	text: string;
	images?: BlogImage[];
}

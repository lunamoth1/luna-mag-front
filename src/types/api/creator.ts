export interface CreatorImage {
	id: string;
	fileId: number;
	url: string;
}

export interface Creator {
	id: number;
	documentId: string;
	instagram: string;
	photo: CreatorImage | null;
	worksPhotos: CreatorImage[];
	based: string;
	style: string;
	hide: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface EditCreator {
	instagram: string;
	photo?: CreatorImage | null;
	worksPhotos?: CreatorImage[];
	based: string;
	style: string;
	hide: boolean;
}

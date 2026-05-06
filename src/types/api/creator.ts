export interface Creator {
	id: number;
	documentId: string;
	instagram: string;
	photo: string;
	worksPhotos: string[];
	based: string;
	style: string;
	hide: boolean;
}

export interface EditCreator {
	instagram: string;
	photo: string;
	worksPhotos: string[];
	based: string;
	style: string;
	hide: boolean;
}

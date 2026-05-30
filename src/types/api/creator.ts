export interface CreatorImage {
	id: string;
	fileId: number;
	url: string;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
	alternativeText: string | null;
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

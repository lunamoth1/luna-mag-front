export interface GalleryImage {
	url: string;
}

export interface Gallery {
	id: number;
	documentId?: string;
	image: GalleryImage;
	link: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface EditGallery {
	image: GalleryImage;
	link: string;
}

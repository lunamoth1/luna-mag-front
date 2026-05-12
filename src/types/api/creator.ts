export interface StrapiImage {
	id: number;
	url: string;
	alternativeText: string | null;
	caption: string | null;
	ext: string;
	formats?: Record<string, any>;
	hash: string;
	height: number;
	width: number;
	mime: string;
	name: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: any;
	size: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	documentId?: string;
	focalPoint?: any;
}

export interface Creator {
	id: number;
	documentId: string;
	instagram: string;
	photo: StrapiImage;
	worksPhotos: StrapiImage[];
	based: string;
	style: string;
	hide: boolean;
}

export interface EditCreator {
	instagram: string;
	photo?: number; // ID файла в Strapi
	worksPhotos?: number[]; // Массив ID файлов в Strapi
	based: string;
	style: string;
	hide: boolean;
}

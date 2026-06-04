import { Gallery } from "../api/galleries";

export interface GalleryState {
	galleries: Gallery[];
	setGalleries: (galleries: Gallery[]) => void;
}

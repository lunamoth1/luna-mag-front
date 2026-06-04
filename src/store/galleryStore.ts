import { create } from "zustand";
import { GalleryState } from "@/types/stores/galleryStore";

export const useGalleryStore = create<GalleryState>((set) => ({
	galleries: [],
	setGalleries: (galleries) => set({ galleries }),
}));

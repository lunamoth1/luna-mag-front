import { create } from "zustand";
import { BlogState } from "@/types/stores/blogStore";

export const useBlogStore = create<BlogState>((set) => ({
	blogs: [],
	setBlogs: (blogs) => set({ blogs }),
}));

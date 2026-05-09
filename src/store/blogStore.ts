import { create } from "zustand";
import type { BlogPost } from "@/types/api/blog";

interface BlogState {
	blogs: BlogPost[];
	setBlogs: (blogs: BlogPost[]) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
	blogs: [],
	setBlogs: (blogs) => set({ blogs }),
}));

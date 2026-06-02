import { BlogPost } from "../api/blog";

export interface BlogState {
	blogs: BlogPost[];
	setBlogs: (blogs: BlogPost[]) => void;
}

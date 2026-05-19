import { JSX, useState, useEffect } from "react";
import {
	fetchBlogs,
	addBlogPost,
	updateBlogPost,
	deleteBlogPost,
} from "@/api/blog";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import BlogMainBlock from "./components/blogMainBlock/BlogMainBlock";
import BlogAllPosts from "./components/blogAllPosts/BlogAllPosts";
import styles from "./blogAdminPage.module.css";
import type { BlogPost, BlogImage } from "@/types/api/blog";

export default function BlogAdminPage(): JSX.Element {
	const [blogs, setBlogs] = useState<BlogPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [uploadedImages, setUploadedImages] = useState<BlogImage[]>([]);

	const loadBlogs = async () => {
		setIsLoading(true);
		try {
			const data = await fetchBlogs();
			setBlogs(data || []);
		} catch (error) {
			console.error("Ошибка при загрузке постов:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadBlogs();
	}, []);

	const handleEdit = (blogPost: BlogPost) => {
		setEditingDocId(blogPost.documentId || null);
		setTitle(blogPost.title || "");
		setText(blogPost.text || "");
		setUploadedImages(blogPost.images || []);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDelete = async (docId: string | undefined) => {
		if (!docId) return;
		if (!confirm("Вы уверены, что хотите удалить этот пост?")) return;

		try {
			await deleteBlogPost(docId);
			await loadBlogs();
		} catch (error) {
			alert("Ошибка при удалении");
			console.error("Ошибка при удалении поста:", error);
		}
	};

	if (isLoading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление блогом" showBack />

			<div className={styles.container}>
				<BlogMainBlock
					editingDocId={editingDocId}
					title={title}
					text={text}
					isSaving={isSaving}
					setTitle={setTitle}
					setText={setText}
					uploadedImages={uploadedImages}
					setUploadedImages={setUploadedImages}
					loadBlogs={loadBlogs}
					addBlogPost={addBlogPost}
					updateBlogPost={updateBlogPost}
					setEditingDocId={setEditingDocId}
					setIsSaving={setIsSaving}
				/>

				<BlogAllPosts
					blogs={blogs}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</div>
		</>
	);
}

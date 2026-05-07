import { JSX, useState, useEffect } from "react";
import { fetchCreators } from "@/api/creator";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import CreatorsMainBlock from "./components/creatorsMainBlock/CreatorsMainBlock";
import CreatorsAddCreators from "./components/creatorsAddCreators/CreatorsAddCreators";
import styles from "./creatorsAdminPage.module.css";
import type { Creator } from "@/types/api/creator";

export default function CreatorsAdminPage(): JSX.Element {
	const [creators, setCreators] = useState<Creator[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [instagram, setInstagram] = useState("");

	const [based, setBased] = useState("");
	const [style, setStyle] = useState("");
	const [hide, setHide] = useState(false);

	const loadCreators = async () => {
		setIsLoading(true);
		const data = await fetchCreators();
		setCreators(data || []);
		setIsLoading(false);
	};

	useEffect(() => {
		loadCreators();
	}, []);

	if (isLoading) {
		return <div className={styles.container}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление креаторами" showBack />

			<div className={styles.container}>
				<CreatorsMainBlock
					editingDocId={editingDocId}
					instagram={instagram}
					based={based}
					style={style}
					hide={hide}
					setInstagram={setInstagram}
					setBased={setBased}
					setStyle={setStyle}
					setHide={setHide}
					loadCreators={loadCreators}
					setEditingDocId={setEditingDocId}
				/>

				<CreatorsAddCreators
					creators={creators}
					setEditingDocId={setEditingDocId}
					setInstagram={setInstagram}
					setBased={setBased}
					setStyle={setStyle}
					setHide={setHide}
					loadCreators={loadCreators}
				/>
			</div>
		</>
	);
}

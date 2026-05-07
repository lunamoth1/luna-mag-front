import { API_URL } from "@/constants";

export function getImageUrl(url: string | undefined): string | undefined {
	if (!url) return undefined;
	if (url.startsWith("http")) return url;

	if (url.startsWith("/")) {
		try {
			const apiUrlObj = new URL(API_URL);
			return `${apiUrlObj.origin}${url}`;
		} catch {
			return `${API_URL}${url}`;
		}
	}
	return `${API_URL}${url}`;
}

import { API_URL } from "@/constants";

export function getImageUrl(url: string | undefined): string | undefined {
	if (!url) return undefined;
	if (url.startsWith("http")) return url;

	if (url.startsWith("/")) {
		try {
			const apiUrlObj = new URL(API_URL);
			const result = `${apiUrlObj.origin}${url}`;
			console.log(`[getImageUrl] input: ${url}, output: ${result}`);
			return result;
		} catch (e) {
			console.error(`[getImageUrl] Error parsing API_URL: ${API_URL}`, e);
			return `${API_URL}${url}`;
		}
	}
	console.log(`[getImageUrl] input: ${url}, output: ${API_URL}${url}`);
	return `${API_URL}${url}`;
}

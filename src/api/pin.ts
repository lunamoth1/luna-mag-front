import axios from "axios";
import type { PinVerify } from "../types/api/pin";

const API_URL = import.meta.env.VITE_STRAPI_URL;

export async function verifyPin(pin: string): Promise<boolean> {
	try {
		const response = await axios.post<PinVerify>(`${API_URL}/api/pin/verify`, {
			pin,
		});
		return response.data.success === true;
	} catch (error) {
		console.error("Error verifying PIN:", error);
		return false;
	}
}

import axios from "axios";
import { API_URL } from "@/constants";
import type { PinVerify } from "../types/api/pin";

export async function verifyPin(pin: string): Promise<boolean> {
	try {
		const res = await axios.post<PinVerify>(`${API_URL}/api/pin/verify`, {
			pin,
		});

		return res.data.success === true;
	} catch (error) {
		console.error("Error verifying PIN:", error);
		return false;
	}
}

import { Partner } from "../api/partner";

export interface PartnerState {
	partners: Partner[];
	setPartners: (partners: Partner[]) => void;
}

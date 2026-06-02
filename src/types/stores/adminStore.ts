export interface AdminState {
	isAuthenticated: boolean;
	setAuthenticated: (value: boolean) => void;
	logout: () => void;
}

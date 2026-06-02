import { Creator } from "../api/creator";

export interface CreatorsState {
	creators: Creator[];
	isLoading: boolean;
	setCreators: (creators: Creator[]) => void;
	setIsLoading: (isLoading: boolean) => void;
}

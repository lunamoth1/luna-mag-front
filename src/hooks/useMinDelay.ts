import { useEffect, useState } from "react";

export function useMinDelay(isLoading: boolean, delay = 200) {
	const [isTimeElapsed, setIsTimeElapsed] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setIsTimeElapsed(false);
			const timer = setTimeout(() => {
				setIsTimeElapsed(true);
			}, delay);

			return () => clearTimeout(timer);
		}
	}, [isLoading, delay]);

	const [mountTime] = useState(() => Date.now());
	const [forceReady, setForceReady] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			const timePassed = Date.now() - mountTime;
			if (timePassed >= delay) {
				setForceReady(true);
			} else {
				const remaining = delay - timePassed;
				const t = setTimeout(() => setForceReady(true), remaining);
				return () => clearTimeout(t);
			}
		}
	}, [isLoading, delay, mountTime]);

	if (isLoading) return false;
	return isTimeElapsed || forceReady;
}

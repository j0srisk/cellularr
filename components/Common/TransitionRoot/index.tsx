'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

interface TransitionContextType {
	transitioning: boolean;
	setTransitioning: (value: boolean) => void;
	duration: number;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export default function TransitionRoot({
	duration = 500,
	children,
}: {
	duration?: number;
	children: React.ReactNode;
}) {
	const [transitioning, setTransitioning] = useState(true);

	return (
		<TransitionContext.Provider value={{ transitioning, setTransitioning, duration }}>
			<>
				<div
					style={{
						transitionDuration: transitioning ? `${duration * 2}ms` : undefined,
					}}
					className={`h-full w-full translate-x-0 ${
						transitioning ? '-translate-x-full transform-gpu transition-transform ease-out' : ''
					}`}
				>
					{children}
				</div>

				<div
					style={{
						transitionDuration: transitioning ? `${duration}ms` : undefined,
					}}
					className={`fixed left-0 top-0 z-30 h-full w-full transform-gpu bg-system-primary-light shadow-drop-lg dark:bg-system-primary-dark ${
						transitioning ? 'translate-x-0 transition-transform ease-out' : 'translate-x-full'
					}`}
				/>
			</>
		</TransitionContext.Provider>
	);
}

export function useTransition() {
	const context = useContext(TransitionContext);
	const router = useRouter();
	const pathname = usePathname();

	if (!context) {
		throw new Error('useTransition must be used within a TransitionProvider');
	}

	//TODO: figure out how to set transitioning to false when user clicks home or applications during transition
	useEffect(() => {
		if (context.transitioning) {
			context.setTransitioning(false);
		}
	}, [pathname]);

	const navigateWithTransition = (href: string) => {
		context.setTransitioning(true);
		router.prefetch(href);
		setTimeout(() => {
			router.push(href);
		}, context.duration);
	};

	return { ...context, navigateWithTransition };
}

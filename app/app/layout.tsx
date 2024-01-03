'use client';

import Navbar from '@/components/ui/Navbar';

export default function Page({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex h-[100dvh] w-full items-center justify-center ">
			{children}
			<Navbar />
		</div>
	);
}

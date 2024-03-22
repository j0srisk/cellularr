'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ToggleButtonProps = {
	toggled: boolean;
	disabled?: boolean;
	color?: string;
	onToggle?: () => void;
};

export default function ToggleButton({ toggled, disabled, color, onToggle }: ToggleButtonProps) {
	//const [disabled, setDisabled] = useState(Disabled || false);

	return (
		<button
			disabled={disabled}
			style={{
				opacity: disabled ? 0.5 : 1,
				justifyContent: toggled ? 'flex-end' : 'flex-start',
			}}
			className={`flex h-[31px] w-[51px] flex-shrink-0 rounded-full p-[2px] ${
				toggled
					? twMerge('bg-system-green-light dark:bg-system-green-dark', color)
					: 'bg-fill-secondary-light dark:bg-fill-secondary-dark'
			}`}
			onClick={() => {
				toggled = !toggled;
				onToggle && onToggle();
			}}
		>
			<div className="aspect-square h-[27px] rounded-full bg-white shadow-[0px_3px_1px_0px_rgba(0,0,0,0.06),0px_3px_8px_0px_rgba(0,0,0,0.15),0px_0px_0px_1px_rgba(0,0,0,0.04)]" />
		</button>
	);
}

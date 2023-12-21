'use client';

import { useState } from 'react';

type ToggleButtonProps = {
	isToggled: boolean;
	isDisabled?: boolean;
};

export default function ToggleButton({ isToggled, isDisabled }: ToggleButtonProps) {
	const [toggled, setToggled] = useState(isToggled);
	const [disabled, setDisabled] = useState(isDisabled || false);

	return (
		<button
			disabled={disabled}
			style={{
				opacity: disabled ? 0.5 : 1,
				justifyContent: toggled ? 'flex-end' : 'flex-start',
			}}
			className={`flex h-[31px] w-[51px] flex-shrink-0 rounded-full p-[2px] ${
				toggled
					? 'bg-system-indigo-light dark:bg-system-indigo-dark'
					: 'bg-fill-secondary-light dark:bg-fill-secondary-dark'
			}`}
			onClick={() => {
				setToggled(!toggled);
			}}
		>
			<div className="aspect-square h-[27px] rounded-full bg-white shadow-[0px_3px_1px_0px_rgba(0,0,0,0.06),0px_3px_8px_0px_rgba(0,0,0,0.15),0px_0px_0px_1px_rgba(0,0,0,0.04)]" />
		</button>
	);
}

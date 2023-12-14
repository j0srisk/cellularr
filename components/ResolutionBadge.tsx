import { FileMetadata } from '@/app/types';

type ResolutionBadgeProps = {
	resolution: FileMetadata['resolution'];
};

export default function ResolutionBadge({ resolution }: ResolutionBadgeProps) {
	switch (resolution) {
		case '4k':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="15"
					width="26"
					viewBox="0 0 26 15"
					className="h-3"
				>
					<path
						d="M2.737 0h20.528A2.732 2.732 0 0126 2.727v9.545A2.732 2.732 0 0123.265 15H2.737A2.732 2.732 0 010 12.272V2.727A2.732 2.732 0 012.737 0zm7.078 11.6H11.5v-1.5h1.1V8.681h-1.1v-5.53H9a55.89 55.89 0 00-3.39 5.442V10.1h4.205zM7.162 8.686A39.876 39.876 0 019.815 4.4h.035v4.333H7.162zm8.273 2.914V9.02l.791-.949 2.507 3.529h2.114L17.5 6.9l3.13-3.749h-1.968l-3.174 3.854h-.053V3.151h-1.769V11.6z"
						fill="currentColor"
						fill-rule="evenodd"
					/>
				</svg>
			);
		default:
			return <p>NOT FOUND</p>;
	}
}
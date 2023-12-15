import { MovieDetails, Audio } from '@/app/types';
import { FormatDuration, FormatReleaseDate } from '@/app/utils';
import InformationItem from '@/components/media/InformationItem';
import SectionTemplate from '@/components/media/SectionTemplate';

export default function Information({ mediaDetails }: { mediaDetails: MovieDetails }) {
	if (!mediaDetails.tatutulliMetadata) {
		return null;
	}

	return (
		<SectionTemplate heading={'Languages'}>
			<InformationItem
				title={'Audio'}
				value={Array.from(
					new Set(mediaDetails.tatutulliMetadata.audios.map((audio) => audio.language)),
				).join(', ')}
			/>

			<InformationItem
				title={'Subtitles'}
				value={Array.from(
					new Set(mediaDetails.tatutulliMetadata.subtitles.map((subtitle) => subtitle.language)),
				).join(', ')}
			/>
		</SectionTemplate>
	);
}

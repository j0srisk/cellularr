import { MovieDetails } from '@/app/types';
import { FormatDuration, FormatReleaseDate } from '@/app/utils';
import InformationItem from '@/components/media/InformationItem';
import SectionTemplate from '@/components/media/SectionTemplate';

export default function Information({ mediaDetails }: { mediaDetails: MovieDetails }) {
	return (
		<SectionTemplate heading={'Information'}>
			<InformationItem
				title={'Production Company'}
				value={
					mediaDetails.productionCompanies[0] ? (
						<>{mediaDetails.productionCompanies[0].name}</>
					) : (
						<>Unknown</>
					)
				}
			/>
			<InformationItem
				title={'Release Date'}
				value={
					mediaDetails.releaseDate ? (
						<>{FormatReleaseDate(mediaDetails.releaseDate)}</>
					) : (
						<>Unknown</>
					)
				}
			/>
			<InformationItem
				title={'Run Time'}
				value={mediaDetails.runtime ? <>{FormatDuration(mediaDetails.runtime)}</> : <>Unknown</>}
			/>
			<InformationItem
				title={'Budget'}
				value={mediaDetails.budget ? <>${mediaDetails.budget?.toLocaleString()}</> : <>Unknown</>}
			/>
			<InformationItem
				title={'Revenue'}
				value={mediaDetails.revenue ? <>${mediaDetails.revenue?.toLocaleString()}</> : <>Unknown</>}
			/>
		</SectionTemplate>
	);
}

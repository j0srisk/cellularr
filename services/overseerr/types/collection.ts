import { MediaType } from '@/app/types';
import { MovieResult } from '@/services/overseerr/types/search';

export interface Collection {
	id: number;
	mediaType: MediaType.COLLECTION;
	name: string;
	posterPath: string | null;
	backdropPath: string | null;
	overview: string | null;
	parts: MovieResult[];
}

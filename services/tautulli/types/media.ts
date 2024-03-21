export enum PartType {
	VIDEO = 1,
	AUDIO = 2,
	SUBTITLE = 3,
}

export interface Media {
	rating_key: string;
	parent_rating_key: string | null;
	grandparent_rating_key: string | null;
	media_type: string;
	title: string;
	parent_title: string | null;
	grandparent_title: string | null;
	guids: string[];
	parent_guids: string[] | null;
	grandparent_guids: string[] | null;
	media_info: MediaFile[];
}

export interface MediaFile {
	id: number;
	container: string;
	video_resolution: string;
	video_full_resolution: string;
	audio_codec: string;
	audio_channel_layout: string;
	parts: Part[];
}

export interface Part {
	id: number;
	file: string;
	file_size: number;
	streams: Stream[];
}

export interface Stream {
	id: number;
	type: PartType;
	video_dynamic_range?: string;
	audio_language?: string;
	audio_language_code?: string;
	subtitle_language?: string;
	subtitle_language_code?: string;
}

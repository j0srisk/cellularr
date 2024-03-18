export interface MediaInfo {
	mediaFiles: MediaFile[];
}

export interface MediaFile {
	id: number;
	container: string;
	video_resolution: string;
	video_full_resolution: string;
	parts: Part[];
}

export interface Part {
	id: number;
	file: string;
	file_size: number;
	indexes: number;
	streams: Stream[];
}

export interface Stream {
	id: number;
	type: number;
	subtitle_language: string;
	subtitle_language_code: string;
}

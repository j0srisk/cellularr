export interface ActivityData {
	stream_count: string;
	stream_count_direct_play: number;
	stream_count_direct_stream: number;
	stream_count_transcode: number;
	total_bandwidth: number;
	lan_bandwidth: number;
	wan_bandwidth: number;
	sessions: Session[];
}

export interface Session {
	session_key: string;
	media_type: string;
	progress_percent: string;
	library_name: string;
	rating_key: string;
	parent_rating_key: string | null;
	grandparent_rating_key: string | null;
	title: string;
	parent_title: string | null;
	grandparent_title: string | null;
	media_index: string | null;
	parent_media_index: string | null;
	thumb: string;
	parent_thumb: string | null;
	grandparent_thumb: string | null;
	art: string;
	banner: string | null;
	duration: string;
	year: string;
	player: string;
	bandwidth: string;
	location: string;
	transcode_progress: number | null;
	state: string;
	user: string;
	user_id: number;
	username: string;
	user_thumb: string;
	ip_address: string;
	guids: string[];
	parent_guids: string[] | null;
	grandparent_guids: string[] | null;
}

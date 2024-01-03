'use server';

import { MediaType } from '@/app/types';
import overseerr from '@/services/overseerr';
import tautulli from '@/services/tautulli';
import { promises as fs } from 'fs';
import { parse } from 'yaml';

export async function SearchOverseerr(query: string, page?: number, language?: string) {
	const searchResults = await overseerr.search(query, page, language);

	return searchResults;
}

export async function requestMedia(mediaType: MediaType, id: number, seasons?: number[]) {
	const request = await overseerr.request(mediaType, id, seasons);

	return request;
}

export async function GetMovie(id: number) {
	const movie = await overseerr.getMovie(id);

	return movie;
}

export async function GetRecommendedMovies(id: number) {
	const recommendedMovies = await overseerr.getRecommendedMovies(id);

	return recommendedMovies;
}

export async function GetSimilarMovies(id: number) {
	const similarMovies = await overseerr.getSimilarMovies(id);

	return similarMovies;
}

export async function GetCollection(id: number) {
	const collection = await overseerr.getCollection(id);

	return collection;
}

export async function GetSeries(id: number) {
	const series = await overseerr.getSeries(id);

	return series;
}

export async function GetRecommendedSeries(id: number) {
	const recommendedSeries = await overseerr.getRecommendedSeries(id);

	return recommendedSeries;
}

export async function GetSimilarSeries(id: number) {
	const similarSeries = await overseerr.getSimilarSeries(id);

	return similarSeries;
}

export async function GetSeason(id: number, seasonNumber: number) {
	const season = await overseerr.getSeason(id, seasonNumber);

	return season;
}

export async function GetDownloads(mediaType: MediaType, id: number) {
	console.log('Getting downloads for ' + mediaType + ' ' + id);
	const downloads = await overseerr.getDownloads(mediaType, id);

	return downloads;
}

export async function GetActiveSessions() {
	const sessions = await tautulli.getSessions();

	return sessions;
}

export async function GetApplications() {
	const yamlFile = await fs.readFile(process.cwd() + '/applications.yaml', 'utf8');

	const yamlData = parse(yamlFile);

	return yamlData;
}

type AvailableColors =
	| 'black'
	| 'red'
	| 'darkred'
	| 'blue'
	| 'lightblue'
	| 'darkblue'
	| 'orange'
	| 'darkorange'
	| 'green'
	| 'lightgreen'
	| 'purple'
	| 'darkpurple'
	| 'yellow'
	| 'pink';

export const colorTones: Record<AvailableColors, [string, string]> = {
	red: ['991B1B', 'FCA5A5'],
	darkred: ['1F2937', 'F87171'],
	blue: ['032541', '01b4e4'],
	lightblue: ['1F2937', '60A5FA'],
	darkblue: ['1F2937', '2864d2'],
	orange: ['92400E', 'FCD34D'],
	lightgreen: ['065F46', '6EE7B7'],
	green: ['087d29', '21cb51'],
	purple: ['5B21B6', 'C4B5FD'],
	yellow: ['777e0d', 'e4ed55'],
	darkorange: ['552c01', 'd47c1d'],
	black: ['1F2937', 'D1D5DB'],
	pink: ['9D174D', 'F9A8D4'],
	darkpurple: ['480c8b', 'a96bef'],
};

export const genreColorMap: Record<number, [string, string]> = {
	0: colorTones.black,
	28: colorTones.red, // Action
	12: colorTones.darkpurple, // Adventure
	16: colorTones.blue, // Animation
	35: colorTones.orange, // Comedy
	80: colorTones.darkblue, // Crime
	99: colorTones.lightgreen, // Documentary
	18: colorTones.pink, // Drama
	10751: colorTones.yellow, // Family
	14: colorTones.lightblue, // Fantasy
	36: colorTones.orange, // History
	27: colorTones.black, // Horror
	10402: colorTones.blue, // Music
	9648: colorTones.purple, // Mystery
	10749: colorTones.pink, // Romance
	878: colorTones.lightblue, // Science Fiction
	10770: colorTones.red, // TV Movie
	53: colorTones.black, // Thriller
	10752: colorTones.darkred, // War
	37: colorTones.orange, // Western
	10759: colorTones.darkpurple, // Action & Adventure
	10762: colorTones.blue, // Kids
	10763: colorTones.black, // News
	10764: colorTones.darkorange, // Reality
	10765: colorTones.lightblue, // Sci-Fi & Fantasy
	10766: colorTones.pink, // Soap
	10767: colorTones.lightgreen, // Talk
	10768: colorTones.darkred, // War & Politics
};

export const genreNameMap: Record<number, string> = {
	0: 'Trending',
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western',
	10759: 'Action & Adventure',
	10762: 'Kids',
	10763: 'News',
	10764: 'Reality',
	10765: 'Sci-Fi & Fantasy',
	10766: 'Soap',
	10767: 'Talk',
	10768: 'War & Politics',
};

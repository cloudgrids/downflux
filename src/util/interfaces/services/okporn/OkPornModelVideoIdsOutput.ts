export interface OkPornModelVideoCard {
	videoId: string;
	customTitle: string;
	preview: string;
	screenShot: string;
	duration: string;
}

export interface OkPornModelVideoIdsOutput {
	baseUrl: string;
	pageTitle: string;
	videoCount: number;
	modelName?: string;
	videoCards: OkPornModelVideoCard[];
}

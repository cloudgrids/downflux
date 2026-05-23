import { AuthenticatedCrawlOptions, DefaultExecutionResult, ExecutionArgs } from '@contracts';
import { TwitterSearchMode } from './TwitterTypes';

export interface TwitterExecArgs extends ExecutionArgs {
	auth?: AuthenticatedCrawlOptions;
	username?: string;
	tweetId?: string;
	query?: string;
	apiArgs?: TwitterApiTimelineArgs;
}

export interface TwitterApiTimelineArgs {
	userId?: string;
	maxResults?: number;
	paginationToken?: string;
	paginationTokens?: string[];
	includeReplies?: boolean;
	includeRetweets?: boolean;
}

export interface TwitterUserTimelineArgs extends TwitterApiTimelineArgs {
	username?: string;
	useApi?: boolean;
}

export interface TwitterSearchArgs {
	query: string;
	mode?: TwitterSearchMode;
}

export interface TwitterMediaOutput {
	url: string;
	type: 'photo' | 'video' | 'animated_gif' | 'unknown';
	previewUrl?: string;
	width?: number;
	height?: number;
	altText?: string;
}

export interface TwitterUserOutput {
	id?: string;
	username: string;
	displayName?: string;
	description?: string;
	avatarUrl?: string;
	bannerUrl?: string;
	followersCount?: number;
	followingCount?: number;
	postCount?: number;
	verified?: boolean;
	protected?: boolean;
}

export interface TwitterPostOutput {
	id: string;
	url: string;
	text?: string;
	createdAt?: string;
	author?: TwitterUserOutput;
	replyCount?: number;
	repostCount?: number;
	likeCount?: number;
	quoteCount?: number;
	viewCount?: number;
	hashtags: string[];
	links: string[];
	media: TwitterMediaOutput[];
}

export interface TwitterTimelineOutput {
	username?: string;
	userId?: string;
	currentPage: string;
	fetchedPosts: string;
	nextToken?: string;
	postUrls: string[];
	mediaUrls: string[];
	posts: TwitterPostOutput[];
	users: TwitterUserOutput[];
}

export interface TwitterOutput extends DefaultExecutionResult {
	username?: string;
	tweetId?: string;
	posts: TwitterPostOutput[];
	users: TwitterUserOutput[];
	postUrls: string[];
	mediaUrls: string[];
	nextToken?: string;
}

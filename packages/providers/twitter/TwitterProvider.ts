import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, PageRange, Provider } from '@types';
import { TwitterApiTimelineArgs, TwitterExecArgs, TwitterPostOutput, TwitterSearchArgs, TwitterTimelineOutput } from './TwitterContracts';
import { TwitterMethods } from './TwitterTypes';

const DEFAULT_PAGE_RANGE: PageRange = { page: 1, limit: 1 };

export class TwitterProvider extends BaseProvider<TwitterExecArgs> {
	protected readonly provider = Provider.Twitter;

	constructor(url: string) {
		super(url, {
			provider: Provider.Twitter,
			urlPattern: /^(?:www\.)?(?:twitter|x)\.com$/i,
			metadata: {
				hasHls: true,
				type: 'socialmedia',
				hlsIntegrated: false,
				hasMp4: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: true,
				canDownload: true,
				underDevelopment: true,
				needsExternalAPI: true,
				requiresLogin: true,
				cloudflareChallenge: true,
				sniSpoofing: 'untested'
			}
		});
	}

	private get X_ORIGIN(): string {
		return 'https://x.com';
	}

	private get API_ORIGIN(): string {
		return 'https://api.twitter.com';
	}

	private get usernameFromUrl(): string | undefined {
		const [first] = new URL(this.url).pathname.split('/').filter(Boolean);
		if (!first || ['i', 'home', 'explore', 'search', 'notifications', 'messages', 'settings'].includes(first)) return undefined;
		return first;
	}

	private get tweetIdFromUrl(): string | undefined {
		return new URL(this.url).pathname.match(/\/status(?:es)?\/(\d+)/i)?.[1];
	}

	private profileUrl(username: string, section?: 'media' | 'likes'): string {
		return `${this.X_ORIGIN}/${username}${section ? `/${section}` : ''}`;
	}

	private tweetUrl(username: string, tweetId: string): string {
		return `${this.X_ORIGIN}/${username}/status/${tweetId}`;
	}

	private searchUrl(args: TwitterSearchArgs): string {
		const url = new URL('/search', this.X_ORIGIN);
		url.searchParams.set('q', args.query);
		url.searchParams.set('src', 'typed_query');
		if (args.mode && args.mode !== 'top') url.searchParams.set('f', args.mode);
		return url.toString();
	}

	private userTweetsApiUrl(args: TwitterApiTimelineArgs, liked = false): string {
		if (!args.userId)
			throw new GenericException('Twitter userId is required for API-backed crawling', this.provider, TwitterMethods.getUserPosts);

		const endpoint = liked ? `/2/users/${args.userId}/liked_tweets` : `/2/users/${args.userId}/tweets`;
		const url = new URL(endpoint, this.API_ORIGIN);
		url.searchParams.set('max_results', String(args.maxResults ?? 25));
		url.searchParams.set('tweet.fields', 'attachments,author_id,created_at,entities,public_metrics,referenced_tweets,text');
		url.searchParams.set('user.fields', 'description,profile_image_url,public_metrics,username,verified,protected,name');
		url.searchParams.set('media.fields', 'alt_text,duration_ms,height,media_key,preview_image_url,type,url,width');
		url.searchParams.set('expansions', 'attachments.media_keys,author_id');

		if (!args.includeReplies && !liked) url.searchParams.append('exclude', 'replies');
		if (!args.includeRetweets && !liked) url.searchParams.append('exclude', 'retweets');
		if (args.paginationToken) url.searchParams.set('pagination_token', args.paginationToken);

		return url.toString();
	}

	/**
	 * Fetches one tweet/post page. The tweet id and username are inferred from the entry URL when omitted.
	 */
	public async getPost(tweetId = this.tweetIdFromUrl, username = this.usernameFromUrl): Promise<TwitterPostOutput> {
		if (!tweetId) throw new GenericException('Tweet id is required', this.provider, TwitterMethods.getPost);
		if (!username) throw new GenericException('Username is required', this.provider, TwitterMethods.getPost);

		return await this.execute<TwitterPostOutput>({
			targets: [this.tweetUrl(username, tweetId)],
			method: TwitterMethods.getPost,
			provider: this.provider,
			extractionTarget: ExtractionTarget.ALL_URLS,
			executionShape: 'single',
			username,
			tweetId
		});
	}

	/**
	 * Fetches profile timeline pages, or Twitter API v2 user tweets when `useApi` and `userId` are provided.
	 */
	public async getUserPosts(args: TwitterApiTimelineArgs & { username?: string; useApi?: boolean } = {}, range = DEFAULT_PAGE_RANGE) {
		const username = args.username ?? this.usernameFromUrl;
		if (!username && !args.userId)
			throw new GenericException('Username or userId is required', this.provider, TwitterMethods.getUserPosts);

		const targets = args.useApi
			? [this.userTweetsApiUrl(args)]
			: this.makeTargets(`${this.profileUrl(username ?? '')}?page=`, range, this.provider, TwitterMethods.getUserPosts, false)
					.targets;

		return await this.execute<TwitterTimelineOutput[]>({
			targets,
			method: TwitterMethods.getUserPosts,
			provider: this.provider,
			extractionTarget: ExtractionTarget.ALL_URLS,
			executionShape: 'multiple',
			username,
			apiArgs: args
		});
	}

	/**
	 * Fetches a user's media tab, or API user tweets with media expansions when `useApi` and `userId` are provided.
	 */
	public async getUserMedia(args: TwitterApiTimelineArgs & { username?: string; useApi?: boolean } = {}, range = DEFAULT_PAGE_RANGE) {
		const username = args.username ?? this.usernameFromUrl;
		if (!username && !args.userId)
			throw new GenericException('Username or userId is required', this.provider, TwitterMethods.getUserMedia);

		const targets = args.useApi
			? [this.userTweetsApiUrl(args)]
			: this.makeTargets(
					`${this.profileUrl(username ?? '', 'media')}?page=`,
					range,
					this.provider,
					TwitterMethods.getUserMedia,
					false
				).targets;

		return await this.execute<TwitterTimelineOutput[]>({
			targets,
			method: TwitterMethods.getUserMedia,
			provider: this.provider,
			extractionTarget: ExtractionTarget.ALL_URLS,
			executionShape: 'multiple',
			username,
			apiArgs: args
		});
	}

	/**
	 * Fetches the user's likes page, or Twitter API v2 liked tweets when `useApi` and `userId` are provided.
	 */
	public async getUserLikes(args: TwitterApiTimelineArgs & { username?: string; useApi?: boolean } = {}, range = DEFAULT_PAGE_RANGE) {
		const username = args.username ?? this.usernameFromUrl;
		if (!username && !args.userId)
			throw new GenericException('Username or userId is required', this.provider, TwitterMethods.getUserLikes);

		const targets = args.useApi
			? [this.userTweetsApiUrl(args, true)]
			: this.makeTargets(
					`${this.profileUrl(username ?? '', 'likes')}?page=`,
					range,
					this.provider,
					TwitterMethods.getUserLikes,
					false
				).targets;

		return await this.execute<TwitterTimelineOutput[]>({
			targets,
			method: TwitterMethods.getUserLikes,
			provider: this.provider,
			extractionTarget: ExtractionTarget.ALL_URLS,
			executionShape: 'multiple',
			username,
			apiArgs: args
		});
	}

	/**
	 * Fetches Twitter/X search pages for a query.
	 */
	public async getSearch(args: TwitterSearchArgs, range = DEFAULT_PAGE_RANGE): Promise<TwitterTimelineOutput[]> {
		if (!args.query) throw new GenericException('Search query is required', this.provider, TwitterMethods.getSearch);

		return await this.execute<TwitterTimelineOutput[]>({
			...this.makeTargets(`${this.searchUrl(args)}&page=`, range, this.provider, TwitterMethods.getSearch, false),
			executionShape: 'multiple',
			extractionTarget: ExtractionTarget.ALL_URLS,
			query: args.query
		});
	}
}

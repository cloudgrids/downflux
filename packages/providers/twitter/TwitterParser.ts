import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { Provider } from '@types';
import { TwitterMediaOutput, TwitterOutput, TwitterPostOutput, TwitterUserOutput } from './TwitterContracts';

export class TwitterParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<TwitterOutput>>> {
		try {
			const jsonObjects = this.extractJsonObjects(html);
			const users = this.extractUsers(jsonObjects);
			const posts = this.extractPosts(jsonObjects, sourceUrl, users);
			const mediaUrls = this.unique([
				...posts.flatMap((post) => post.media.flatMap((media) => [media.url, media.previewUrl].filter(Boolean) as string[])),
				...this.extractAllUrls(html).filter((url) => /pbs\.twimg\.com|video\.twimg\.com/i.test(url))
			]);
			const postUrls = this.unique([
				...posts.map((post) => post.url),
				...this.extractAllUrls(html).filter((url) => /(?:twitter|x)\.com\/[^/]+\/status(?:es)?\/\d+/i.test(url))
			]);

			return {
				customFields: {
					sourceUrl,
					username: this.extractUsername(sourceUrl),
					tweetId: this.extractTweetId(sourceUrl),
					posts,
					users,
					postUrls,
					mediaUrls,
					nextToken: this.findFirstStringByKeys(jsonObjects, ['next_token', 'nextToken']),
					allUrls: this.extractAllUrls(html)
				} as TwitterOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', Provider.Twitter, 'TwitterParser', { cause: error });
		}
	}

	private extractJsonObjects(html: string): unknown[] {
		const objects: unknown[] = [];
		const trimmed = html.trim();

		if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
			const parsed = this.safeJsonParse(trimmed);
			if (parsed) objects.push(parsed);
		}

		const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
		let match: RegExpExecArray | null;

		while ((match = scriptPattern.exec(html)) !== null) {
			const content = this.decodeHtmlEntities(match[1]?.trim() ?? '');
			if (!content) continue;

			if (content.startsWith('{') || content.startsWith('[')) {
				const parsed = this.safeJsonParse(content);
				if (parsed) objects.push(parsed);
			}

			for (const key of ['window.__INITIAL_STATE__', '__INITIAL_STATE__', '__NEXT_DATA__']) {
				const assignment = this.extractAssignedJson(content, key);
				if (assignment) objects.push(assignment);
			}
		}

		return objects;
	}

	private extractAssignedJson(script: string, key: string): unknown | null {
		const keyIndex = script.indexOf(key);
		if (keyIndex === -1) return null;

		const start = script.indexOf('{', keyIndex);
		if (start === -1) return null;

		return this.safeJsonParse(this.readBalancedJson(script, start));
	}

	private readBalancedJson(value: string, start: number): string {
		let depth = 0;
		let inString = false;
		let quote = '';
		let escaped = false;

		for (let i = start; i < value.length; i++) {
			const char = value[i];

			if (inString) {
				if (escaped) {
					escaped = false;
					continue;
				}
				if (char === '\\') {
					escaped = true;
					continue;
				}
				if (char === quote) inString = false;
				continue;
			}

			if (char === '"' || char === "'") {
				inString = true;
				quote = char;
				continue;
			}

			if (char === '{') depth++;
			if (char === '}') depth--;
			if (depth === 0) return value.slice(start, i + 1);
		}

		return value.slice(start);
	}

	private safeJsonParse(value: string): unknown | null {
		try {
			return JSON.parse(value);
		} catch {
			return null;
		}
	}

	private extractPosts(objects: unknown[], sourceUrl: string, users: TwitterUserOutput[]): TwitterPostOutput[] {
		const posts = new Map<string, TwitterPostOutput>();
		const usersById = new Map(users.filter((user) => user.id).map((user) => [user.id as string, user]));
		const usersByName = new Map(users.map((user) => [user.username.toLowerCase(), user]));

		for (const value of this.walk(objects)) {
			if (!this.isRecord(value)) continue;

			const legacy = this.isRecord(value.legacy) ? value.legacy : value;
			const id = this.asString(value.rest_id) ?? this.asString(value.id_str) ?? this.asString(value.id);
			const text = this.asString(legacy.full_text) ?? this.asString(legacy.text) ?? this.asString(value.text);

			if (!id || !text) continue;

			const authorId = this.asString(legacy.user_id_str) ?? this.asString(value.author_id);
			const username =
				this.asString(value.core?.user_results?.result?.legacy?.screen_name) ??
				this.asString(value.user?.legacy?.screen_name) ??
				this.extractUsername(sourceUrl) ??
				usersById.get(authorId ?? '')?.username;

			const author =
				(authorId ? usersById.get(authorId) : undefined) ?? (username ? usersByName.get(username.toLowerCase()) : undefined);
			const metrics = this.isRecord(legacy.public_metrics) ? legacy.public_metrics : legacy;
			const url = username ? `https://x.com/${username}/status/${id}` : `https://x.com/i/status/${id}`;

			posts.set(id, {
				id,
				url,
				text: this.decodeHtmlEntities(text),
				createdAt: this.asString(legacy.created_at) ?? this.asString(value.created_at),
				author,
				replyCount: this.asNumber(metrics.reply_count),
				repostCount: this.asNumber(metrics.retweet_count) ?? this.asNumber(metrics.repost_count),
				likeCount: this.asNumber(metrics.favorite_count) ?? this.asNumber(metrics.like_count),
				quoteCount: this.asNumber(metrics.quote_count),
				viewCount: this.asNumber(value.views?.count) ?? this.asNumber(legacy.view_count),
				hashtags: this.extractHashtags(legacy.entities),
				links: this.extractEntityUrls(legacy.entities),
				media: this.extractMedia(legacy)
			});
		}

		return [...posts.values()];
	}

	private extractUsers(objects: unknown[]): TwitterUserOutput[] {
		const users = new Map<string, TwitterUserOutput>();

		for (const value of this.walk(objects)) {
			if (!this.isRecord(value)) continue;

			const legacy = this.isRecord(value.legacy) ? value.legacy : value;
			const username = this.asString(legacy.screen_name) ?? this.asString(value.username);
			if (!username) continue;

			const id = this.asString(value.rest_id) ?? this.asString(value.id_str) ?? this.asString(value.id);
			const metrics = this.isRecord(legacy.public_metrics) ? legacy.public_metrics : legacy;

			users.set(username.toLowerCase(), {
				id,
				username,
				displayName: this.asString(legacy.name) ?? this.asString(value.name),
				description: this.asString(legacy.description) ?? this.asString(value.description),
				avatarUrl: this.asString(legacy.profile_image_url_https) ?? this.asString(value.profile_image_url),
				bannerUrl: this.asString(legacy.profile_banner_url),
				followersCount: this.asNumber(metrics.followers_count),
				followingCount: this.asNumber(metrics.friends_count) ?? this.asNumber(metrics.following_count),
				postCount: this.asNumber(metrics.statuses_count) ?? this.asNumber(metrics.tweet_count),
				verified: this.asBoolean(legacy.verified) ?? this.asBoolean(value.verified),
				protected: this.asBoolean(legacy.protected) ?? this.asBoolean(value.protected)
			});
		}

		return [...users.values()];
	}

	private extractMedia(tweetLikeObject: Record<string, unknown>): TwitterMediaOutput[] {
		const entities = this.isRecord(tweetLikeObject.entities) ? tweetLikeObject.entities : {};
		const extendedEntities = this.isRecord(tweetLikeObject.extended_entities) ? tweetLikeObject.extended_entities : {};
		const attachments = this.isRecord(tweetLikeObject.attachments) ? tweetLikeObject.attachments : {};
		const media = [
			...(this.asArray(entities.media) ?? []),
			...(this.asArray(extendedEntities.media) ?? []),
			...(this.asArray(attachments.media) ?? [])
		];

		return this.uniqueBy(
			media
				.filter(this.isRecord)
				.map((item) => {
					const variants = this.asArray(item.video_info?.variants)?.filter(this.isRecord) ?? [];
					const videoUrl = variants
						.map((variant) => this.asString(variant.url))
						.find((url) => url && /(?:\.mp4|\.m3u8)(?:\?|$)/i.test(url));

					return {
						url: this.asString(item.media_url_https) ?? this.asString(item.url) ?? videoUrl ?? '',
						type: (this.asString(item.type) as TwitterMediaOutput['type']) ?? 'unknown',
						previewUrl: this.asString(item.preview_image_url) ?? this.asString(item.media_url_https),
						width: this.asNumber(item.original_info?.width) ?? this.asNumber(item.width),
						height: this.asNumber(item.original_info?.height) ?? this.asNumber(item.height),
						altText: this.asString(item.ext_alt_text) ?? this.asString(item.alt_text)
					};
				})
				.filter((item) => item.url),
			(item) => item.url
		);
	}

	private extractHashtags(entities: unknown): string[] {
		if (!this.isRecord(entities)) return [];
		return this.unique(
			(this.asArray(entities.hashtags) ?? [])
				.filter(this.isRecord)
				.map((tag) => this.asString(tag.text))
				.filter(Boolean) as string[]
		);
	}

	private extractEntityUrls(entities: unknown): string[] {
		if (!this.isRecord(entities)) return [];
		return this.unique(
			(this.asArray(entities.urls) ?? [])
				.filter(this.isRecord)
				.map((url) => this.asString(url.expanded_url) ?? this.asString(url.url))
				.filter(Boolean) as string[]
		);
	}

	private findFirstStringByKeys(objects: unknown[], keys: string[]): string | undefined {
		for (const value of this.walk(objects)) {
			if (!this.isRecord(value)) continue;
			for (const key of keys) {
				const result = this.asString(value[key]);
				if (result) return result;
			}
		}
		return undefined;
	}

	private *walk(values: unknown[]): Generator<unknown> {
		const stack = [...values];
		const seen = new Set<unknown>();

		while (stack.length) {
			const value = stack.pop();
			if (!value || seen.has(value)) continue;
			seen.add(value);
			yield value;

			if (Array.isArray(value)) {
				stack.push(...value);
			} else if (this.isRecord(value)) {
				stack.push(...Object.values(value));
			}
		}
	}

	private extractUsername(sourceUrl: string): string | undefined {
		const [first] = new URL(sourceUrl).pathname.split('/').filter(Boolean);
		return first && !['i', 'search'].includes(first) ? first : undefined;
	}

	private extractTweetId(sourceUrl: string): string | undefined {
		return new URL(sourceUrl).pathname.match(/\/status(?:es)?\/(\d+)/i)?.[1];
	}

	private isRecord(value: unknown): value is Record<string, any> {
		return Boolean(value && typeof value === 'object' && !Array.isArray(value));
	}

	private asArray(value: unknown): unknown[] | undefined {
		return Array.isArray(value) ? value : undefined;
	}

	private asString(value: unknown): string | undefined {
		return typeof value === 'string' && value ? value : undefined;
	}

	private asNumber(value: unknown): number | undefined {
		if (typeof value === 'number') return value;
		if (typeof value === 'string' && value.trim()) {
			const parsed = Number(value);
			return Number.isFinite(parsed) ? parsed : undefined;
		}
		return undefined;
	}

	private asBoolean(value: unknown): boolean | undefined {
		return typeof value === 'boolean' ? value : undefined;
	}

	private unique(values: string[]): string[] {
		return [...new Set(values)];
	}

	private uniqueBy<T>(values: T[], getKey: (value: T) => string): T[] {
		return [...new Map(values.map((value) => [getKey(value), value])).values()];
	}
}

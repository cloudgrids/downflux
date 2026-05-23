import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TwitterExecArgs, TwitterOutput, TwitterPostOutput, TwitterTimelineOutput } from './TwitterContracts';
import { TwitterMethods } from './TwitterTypes';

type TwitterTransformedOutput = DefaultExecutionResult<Partial<TwitterOutput>>;

export class TwitterTransformer extends BaseTransformer<
	TwitterExecArgs,
	DefaultExecutionResult | TwitterPostOutput | TwitterTimelineOutput
> {
	public async transform(
		url: string,
		request?: TwitterExecArgs
	): Promise<DefaultExecutionResult | TwitterPostOutput | TwitterTimelineOutput> {
		const metadata = (await super.transform(url, request)) as TwitterTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case TwitterMethods.getPost:
				return this.toPostOutput(request, metadata);
			case TwitterMethods.getUserPosts:
			case TwitterMethods.getUserMedia:
			case TwitterMethods.getUserLikes:
			case TwitterMethods.getSearch:
				return this.toTimelineOutput(request, metadata);
			default:
				return metadata;
		}
	}

	private toPostOutput(request: TwitterExecArgs, metadata: TwitterTransformedOutput): TwitterPostOutput {
		const fields = metadata.customFields as TwitterOutput | undefined;
		const post =
			fields?.posts?.find((item) => item.id === request.tweetId) ??
			fields?.posts?.[0] ??
			({
				id: request.tweetId ?? fields?.tweetId ?? 'unknown',
				url: metadata.sourceUrl,
				text: metadata.description || metadata.title,
				hashtags: [],
				links: metadata.anchors ?? [],
				media: []
			} satisfies TwitterPostOutput);

		return {
			...post,
			media: this.uniqueBy(post.media ?? [], (media) => media.url),
			links: this.unique(post.links ?? [])
		};
	}

	private toTimelineOutput(request: TwitterExecArgs, metadata: TwitterTransformedOutput): TwitterTimelineOutput {
		const fields = metadata.customFields as TwitterOutput | undefined;
		const posts = fields?.posts ?? [];
		const mediaUrls = fields?.mediaUrls ?? [];
		const postUrls = fields?.postUrls ?? [];

		return {
			username: request.username ?? fields?.username,
			userId: request.apiArgs?.userId,
			currentPage: new URL(metadata.sourceUrl).searchParams.get('page') ?? '1',
			fetchedPosts: String(posts.length || postUrls.length),
			nextToken: fields?.nextToken,
			postUrls: this.unique(postUrls),
			mediaUrls: this.unique(mediaUrls),
			posts,
			users: fields?.users ?? []
		};
	}

	private uniqueBy<T>(values: T[], getKey: (value: T) => string): T[] {
		return [...new Map(values.map((value) => [getKey(value), value])).values()];
	}
}

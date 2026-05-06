import { OutputType, PornHubService } from '../src';

async function main() {
	const pornHubUrl = 'https://www.pornhub.org/view_video.php?viewkey=69e37154ee7e2';
	const okPornUrl = 'https://ok.porn/video/253305/';
	console.log(`\n\n=== Testing:`);
	const dir = '/Users/arijit/Downloads/';
	// 736213

	try {
		// await new PornHubService(pornHubUrl)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.JSON, { directoryPath: dir })
		// 	.getModelVideos({ username: 'comatozze', format: 'path' });

		await new PornHubService('https://www.pornhub.org/view_video.php?viewkey=69c2ef082e7a6')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setAllowedExtensions('mp4')
			.setOutput(OutputType.DEVICE, { directoryPath: dir })
			.getVideo();

		// await new OkPornService(okPornUrl)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.JSON, { directoryPath: dir })
		// 	.getVideo('253305', VideoQuality.Q720);
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

import { OkPornService, OutputType, PornHubService, VideoQuality } from '../src';

async function main() {
	const pornHubUrl = 'https://www.pornhub.org/view_video.php?viewkey=69d0e70eabacd';
	const okPornUrl = 'https://ok.porn/video/736213/';
	console.log(`\n\n=== Testing:`);
	// 736213

	try {
		const data = await new PornHubService(pornHubUrl)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			.setTransformOutput(true)
			.setOutput(OutputType.DEVICE)
			.getVideo(VideoQuality.Q720);

		// const data = await new OkPornService(okPornUrl)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.DEVICE)
		// 	.getVideo('736213', VideoQuality.Q720);
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

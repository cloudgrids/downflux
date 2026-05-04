import { OutputType, PornHubService, VideoQuality } from '../src';

async function main() {
	const pornHubUrl = 'https://www.pornhub.org/view_video.php?viewkey=6907e342aa256';
	const okPornUrl = 'https://ok.porn/video/253305/';
	console.log(`\n\n=== Testing:`);
	const dir = 'downflux_';
	// const dir = '/Users/arijit/Downloads/';
	// 736213

	try {
		const data = await new PornHubService(pornHubUrl)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			.setTransformOutput(true)
			// .setAllowedExtensions('mp4')
			.setOutput(OutputType.JSON, { directoryPath: dir })
			.getVideo(VideoQuality.Q1080);

		// const data = await new OkPornService(okPornUrl)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.DEVICE, { directoryPath: dir })
		// 	.getVideo('253305', VideoQuality.Q720);
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

import { OkPornService, OutputType, VideoQuality } from '../src';

async function main() {
	const url1 = 'https://ok.porn/video/736213';
	console.log(`\n\n=== Testing:`);
	// 736213

	try {
		const data = await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			.setTransformOutput(true)
			.setAllowedExtensions('mp4')
			.setOutput(OutputType.DEVICE)
			.getVideo('736213', VideoQuality.Q720);
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

import { OkPornService, OutputType, VideoQuality } from '../src';

async function main() {
	const url1 = 'https://ok.porn/video/735116/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress((event) => console.log(event))
			.setOutput(OutputType.JSON)
			.getVideo('735116', { videoQualities: [VideoQuality.Q720] });
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

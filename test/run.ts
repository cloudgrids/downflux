import { OkPornService, OutputType, VideoQuality } from '../src';

async function main() {
	const url1 = 'https://ok.porn/video/733713/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress((event) => console.log(event))
			.setAllowedExtensions('mp4')
			.setOutput(OutputType.DEVICE, { directoryPath: 'downflux_' })
			.getVideo('733713', { videoQualities: [VideoQuality.Q720] });
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

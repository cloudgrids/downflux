import { OkPornService, OutputType } from '../src';

async function main() {
	const url1 = 'https://ok.porn/video/1330/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			// .setAllowedExtensions('mp4')
			.setOutput(OutputType.DEVICE, { directoryPath: '/Users/arijit/Downloads' })
			.getAlbum('1300');
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

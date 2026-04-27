import { OkPornService, OutputType } from '../src';

async function main() {
	const url1 = 'https://ok.porn/albums/1300/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1).setOutput(OutputType.JSON).setJobOptions({}).setMaxDownloads(1).getAlbum('1300');
	} catch (error) {
		console.error('Error during getVideos:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

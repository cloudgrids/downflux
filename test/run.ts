import { OkPornService, OutputType } from '../src';

async function main() {
	const url1 = 'https://ok.porn/albums/1300/';
	console.log(`\n\n=== Testing:`);

	try {
		const data = await new OkPornService(url1).setOutput(OutputType.JSON).getVideo('68664');
		console.log('Extracted data:', data);
	} catch (error) {
		console.error('Error during getVideos:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

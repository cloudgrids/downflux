import { OutputType } from '../src';
import { OkPornProvider } from '../src/providers/OkPornProvider';

async function main() {
	const url1 = 'https://ok.porn/albums/1300/';
	console.log(`\n\n=== Testing:`);
	const okPornExtractor = new OkPornProvider(url1).setOutput(OutputType.DEVICE).addOptions({ device: { path: 'okporn_downloads' } });

	try {
		await okPornExtractor.getAlbum('1300');
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

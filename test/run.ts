import { OutputType, WallHavenService } from '../src';

async function main() {
	const url1 = 'https://wallhaven.cc/w';
	console.log(`\n\n=== Testing:`);

	try {
		await new WallHavenService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			.setOutput(OutputType.JSON)
			.getUserUploads('whimsicalmango');
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

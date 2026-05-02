import { OutputType, WallHavenService } from '../src';

async function main() {
	const url1 = 'https://wallhaven.cc/w/k8kmj1';
	console.log(`\n\n=== Testing:`);
	// 736213

	try {
		const data = await new WallHavenService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress(console.log)
			.setTransformOutput(true)
			.setOutput(OutputType.JSON)
			// .getUserUploadsInfo('daike12123');
		.getUserFavoriteCollections({ username: 'daike12123' });

		console.log({ data });
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

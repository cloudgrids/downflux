import { OkPornService, OutputType } from '../src';

async function main() {
	const url1 = 'https://ok.porn/videos';
	console.log(`\n\n=== Testing:`);

	try {
		// await new OkPornService(url1)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setOutput(OutputType.JSON, { directoryPath: 'downflux_' })
		// 	.getModels({ type: 'index', start: 1, end: 2 });

		await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.setMaxDownloads(10)
			.setAllowedExtensions('mp4')
			.onProgress(console.log)
			.setOutput(OutputType.DEVICE, { directoryPath: 'downflux_' })
			.getModelVideoIds('sara-jay');

		// await new OkPornService(url1)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setOutput(OutputType.JSON, { directoryPath: 'downflux_' })
		// 	.getVideo('1300');

		// await new OkPornService(url1)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setOutput(OutputType.JSON, { directoryPath: 'downflux_' })
		// 	.getVideo('1300');

		// await new OkPornService(url1)
		// 	.setJobOptions({ logProgress: true })
		// 	.onProgress(console.log)
		// 	.setOutput(OutputType.JSON, { directoryPath: 'downflux_' })
		// 	.getTags({});
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

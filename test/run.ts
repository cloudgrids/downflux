import { OkPornService, OutputType } from '../src';

async function main() {
	const url1 = 'https://ok.prn/albums/1300/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1)
			.setOutput(OutputType.JSON)
			.setJobOptions({ dirConfig: { path: 'okporn_downloads' } })
			.getVideos({type: 'index', start: 1330, end: 1332});
	} catch (error) {
		console.error('Error during getVideos:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

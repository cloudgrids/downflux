import { XVideosProvider } from '../src/providers';
import { OutputType } from '../src/shared/enums';

async function main() {
	// https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca
	// https://www.pornhub.org/view_video.php?viewkey=ph61fc2bb578d0a
	// https://www.pornhub.org/view_video.php?viewkey=ph6208fbd8ea348
	// 736213

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		await new XVideosProvider('https://www.xvideos2.com/video.hdlhetk8cf7/british_teen_porn_9')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setOutput(OutputType.DEVICE, { directoryPath: 'DownFlux' })
			.getVideo();
	} catch (error) {
		console.error(error);
		if (error instanceof Error) console.error(error.stack);
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

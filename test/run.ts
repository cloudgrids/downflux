import { PornHubService } from '../src/services';
import { OutputType } from '../src/util';

async function main() {
	// https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca
	// https://www.pornhub.org/view_video.php?viewkey=ph61fc2bb578d0a
	// https://www.pornhub.org/view_video.php?viewkey=ph6208fbd8ea348
	// 736213

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		// await new XHamsterService('https://xhopen.com/videos/roommate-i-tried-to-stick-my-dick-in-her-ass-but-she-couldnt-take-it-xhIGB2j')
		// 	.setJobOptions({ logProgress: true })
		// 	.setTransformOutput(true)
		// 	.setAllowedExtensions('mp4')
		// 	.setOutput(OutputType.JSON, { directoryPath: 'DownFlux' })
		// 	.getVideo();

		// await new OkPornService('https://ok.porn/video/738328/')
		// 	.setJobOptions({ logProgress: true })
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.DEVICE, { directoryPath: directoryPath })
		// 	.getVideo('738328', VideoQuality.Q720);

		await new PornHubService('https://www.pornhub.org/channels?o=al')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setOutput(OutputType.JSON, { directoryPath: 'DownFlux' })
			.getChannels();
	} catch (error) {
		console.error(error);
		if (error instanceof Error) console.error(error.stack);
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

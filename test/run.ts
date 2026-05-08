import { XHamsterService } from '../src/services';
import { OutputType } from '../src/util';

async function main() {
	// https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca
	// https://www.pornhub.org/view_video.php?viewkey=ph61fc2bb578d0a
	// https://www.pornhub.org/view_video.php?viewkey=ph6208fbd8ea348
	// 736213

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		await new XHamsterService('https://xhopen.com/videos/roommate-i-tried-to-stick-my-dick-in-her-ass-but-she-couldnt-take-it-xhIGB2j')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setAllowedExtensions('mp4')
			.setOutput(OutputType.JSON, { directoryPath: 'DownFlux' })
			.getVideo();

		// const prog = new ProgressService();
		// new FfmpegService(prog).finalizeMedia({
		// 	videoCodec: 'libx264',
		// 	inputPath:
		// 		'/Users/arijit/Downloads/xhamster/Levi_Solen/videos/ROOMMATE__I_tried_to_stick_my_dick_in_her_ass_but_she_couldn_t_take_it/_TPL__av1_mp4_m3u8_final.mp4'
		// });

		// await new OkPornService('https://ok.porn/video/738328/')
		// 	.setJobOptions({ logProgress: true })
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.DEVICE, { directoryPath: directoryPath })
		// 	.getVideo('738328', VideoQuality.Q720);

		// await new PornHubService('https://www.pornhub.org/view_video.php?viewkey=ph59af66297e84a')
		// 	.setJobOptions({ logProgress: true })
		// 	.setTransformOutput(true)
		// 	.setOutput(OutputType.DEVICE, { directoryPath })
		// 	.getVideo();
	} catch (error) {
		console.error('Error during getAlbum:');
		console.error(error);
		if (error instanceof Error) console.error(error.stack);
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

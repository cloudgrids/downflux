import { FfmpegService } from '../src/file';
import { ProgressService } from '../src/progress';
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
		// await new XHamsterService('https://xhopen.com/videos/roommate-i-tried-to-stick-my-dick-in-her-ass-but-she-couldnt-take-it-xhIGB2j')
		// 	.setJobOptions({ logProgress: true })
		// 	.setTransformOutput(true)
		// 	.setAllowedExtensions('mp4')
		// 	.setOutput(OutputType.DEVICE, { directoryPath })
		// 	.getVideo();

		const prog = new ProgressService();
		new FfmpegService(prog).finalizeMedia({
			videoCodec: 'libx264',
			inputPath:
				'/Users/arijit/Downloads/xhamster/Levi_Solen/videos/ROOMMATE__I_tried_to_stick_my_dick_in_her_ass_but_she_couldn_t_take_it/_TPL__av1_mp4_m3u8_final.mp4'
		});

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
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

`STATUS: COMPLETED
CURRENT TARGET: https://xhamster.desi/videos/i-just-asked-my-stepbrother-to-give-me-a-massage-xhnZhEo
CURRENT ITEM: https://video-nss.xhpingcdn.com/rXdFOfG0jPZV0AOtN3vZjA==,1778187600/media=hls4/multi=256x144:144p:,426x240:240p:,854x480:480p:,1280x720:720p:,1920x1080:1080p:/027/144/047/_TPL_.av1.mp4.m3u8
CURRENT SEGMENT: https://video-nss.xhpingcdn.com/rXdFOfG0jPZV0AOtN3vZjA==,1778187600/media=hls4/multi=256x144:144p:,426x240:240p:,854x480:480p:,1280x720:720p:,1920x1080:1080p:/027/144/047/1080p.av1.mp4/seg-305-v1-a1.m4s
REDIRECTED URL:
HLS URL:
TARGETS: (1/1) [##############################] (100.00%)
PROGRESS: 76.97 KB / 76.97 KB [##############################] (100.00%)
ITEMS: (2/2) [##############################] (100.00%)
SEGMENTS: (305/305) [##############################] (100.00%)
FAILED: 0
ERROR:
MESSAGE: Re-muxing /Users/arijit/Downloads/xhamster/Comatozze/videos/I_just_asked_my_stepbrother_to_give_me_a_massage.../_TPL_.av1.mp4.ts to /Users/arijit/Downloads/xhamster/Comatozze/videos/I_just_asked_my_stepbrother_to_give_me_a_massage.../_TPL_.av1.mp4.mp4 using ffmpeg...`;

import { OutputType, XHamsterService } from '../src';

async function main() {
	const pornHubUrl = 'https://www.pornhub.org/view_video.php?viewkey=69e37154ee7e2';
	const okPornUrl = 'https://ok.porn/video/253305/';
	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';
	// 736213

	try {
		await new XHamsterService('https://xhamster.desi/videos/i-just-asked-my-stepbrother-to-give-me-a-massage-xhnZhEo')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(false)
			.setOutput(OutputType.JSON)
			.getVideo();

		// await new PornHubService('https://www.pornhub.org/view_video.php?viewkey=684ca4dec8893')
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

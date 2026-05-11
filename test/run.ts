import { OutputType, PornHubProvider } from 'packages';

async function main() {
	// https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca
	// https://www.pornhub.org/view_video.php?viewkey=ph61fc2bb578d0a
	// https://www.pornhub.org/view_video.php?viewkey=ph6208fbd8ea348
	// https://www.pornhub.org/view_video.php?viewkey=69d63371a458d
	// https://hqporn.xxx/beautiful-teen-chick-desires-orgasm_20486401.html
	// https://xnxx.health/search-video/eAE9Uu1uEzEQfBXk3-a66_V--B6gKqJCiBYhRKsoTQMJuuaqJIQgxLszd0X88mg8OzNa-3f6nPp0lXJ6i_O8O58B36Req3kjkpyuU__FWYo09vyfNgYRTbJLiFEAmASrAVRjxkQOJtwy56Co2qpmVy7uBUwrBI1ld7Xq4lms1WIATlalTuNBRdhmRhjxWak0MuJsoSQCENacppoOM_Zok6F6UckqRZ0c4wWJFeWduaIJo7NXmpyNq6ElGCcFgqFQUYahwT5KbchiatJQ3hq3cGSRR61glGIq2zL8wiuysB8BQjprmAc0bCU09D6nj9jw3cVp-7geX__8_mtw_np3Ma28W41Pi-dxvxvF9AWY2eIwHpbDarsbu9Xw42GxflgO42nsnvfj4nTcLzfrGc5zXmgW4fHep55zepd6yukWiQdIt982x-nqw8zeXH56Of-9-KvNejkcNxDc3mDYPaQZdo2PALPEpXQc1DFrx7WlP38BYOuHcQ==/0c29a28e604a244843d390184440854b
	// 736213

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		await new PornHubProvider('https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca')
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

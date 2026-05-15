import { EPornerProvider } from '@provider/eporner';
import { OutputType } from '@types';

async function main() {
	// https://www.pornhub.org/view_video.php?viewkey=68aad3eadaaca
	// https://www.pornhub.org/view_video.php?viewkey=ph61fc2bb578d0a
	// https://www.pornhub.org/view_video.php?viewkey=ph6208fbd8ea348
	// https://www.pornhub.org/view_video.php?viewkey=69d63371a458d
	// https://hqporn.xxx/beautiful-teen-chick-desires-orgasm_20486401.html
	// https://www.cumlouder.com/porn-video/marta-lacroft-is-back/
	// https://sxyprn.com/post/6a04c3df93b97.html
	// https://sxyprn.com/post/6a0353fa27bb7.html
	// https://xcafe.com/59983/
	//https://lovehomeporn.com/video/132676/i-found-out-my-limber-lady-lusts-after-my-pal-s-enormous-rod
	// https://www.megatube.xxx/videos/180705/amateur-fuck-for-niks-indian-and-cum-in-mouth/
	// https://www.tubev.sex/video/2116249/innocent-shoplifter-teen-gets
	// https://mylust.com/videos/969432/pretty-fit-busty-brunette-gal-fulfills-her-step-bro-s-dreams-amazes-him-with-hot-dick-riding/?promoid=15163716308817
	// https://xgroovy.com/videos/651600/busty-bitch-gets-to-know-real-passion-fucking-in-the-shower/
	// https://xnxx.health/search-video/eAE9Uu1uEzEQfBXk3-a66_V--B6gKqJCiBYhRKsoTQMJuuaqJIQgxLszd0X88mg8OzNa-3f6nPp0lXJ6i_O8O58B36Req3kjkpyuU__FWYo09vyfNgYRTbJLiFEAmASrAVRjxkQOJtwy56Co2qpmVy7uBUwrBI1ld7Xq4lms1WIATlalTuNBRdhmRhjxWak0MuJsoSQCENacppoOM_Zok6F6UckqRZ0c4wWJFeWduaIJo7NXmpyNq6ElGCcFgqFQUYahwT5KbchiatJQ3hq3cGSRR61glGIq2zL8wiuysB8BQjprmAc0bCU09D6nj9jw3cVp-7geX__8_mtw_np3Ma28W41Pi-dxvxvF9AWY2eIwHpbDarsbu9Xw42GxflgO42nsnvfj4nTcLzfrGc5zXmgW4fHep55zepd6yukWiQdIt982x-nqw8zeXH56Of-9-KvNejkcNxDc3mDYPaQZdo2PALPEpXQc1DFrx7WlP38BYOuHcQ==/0c29a28e604a244843d390184440854b
	// 736213

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		await new EPornerProvider('https://de.eporner.com/video-tpuMqMUvR6d/i-wanna-impregnate-her/')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setOutput(OutputType.JSON, { directoryPath: 'DownFlux' })
			.getVideo();
	} catch (error) {
		console.error(error);
		if (error instanceof Error) console.error(error.stack);
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

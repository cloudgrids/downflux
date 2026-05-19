import { XozillaProvider } from '@provider/xozilla';
import { ZbPornProvider } from '@provider/zbporn';
import { OutputType } from '@types';

async function main() {
	// All flashvars
	// https://zbporn.tv/videos/614357/dude-fucks-his-petite-stepsis-till-cum-on-her-body/
	// https://www.dafreeporn.com/videos/800659/sharing-daybed-with-step-mom-and-step-sister-fucked-step-sister-after-she-got-excited-watching-step-mamma-suck-on-it/
	// https://bokep.porn/videos/106780/?utm_source=pbw_106780
	// https://www.momvids.com/videos/63349/vvbeautiful-blonde-aunt-in-hotel/?utm_source=PBWeb&utm_medium=PBWeb&sub=100001
	// https://www.its.porn/video/naughty-stepsisters-give-it-up-to-family-friend/?utm_source=pbw
	// https://www.xozilla.xxx/videos/63473/milf-and-son-share-bed/
	// https://www.interracial.com/videos/18682/bwwm-step-sister-and-brother-fuck-sharing-bed-kingsley-and-aiden-valentine/

	// challenging:: https://www.deviants.com/videos/39202/stepmom-sharing-bed-with-son/?utm_source=PBWeb&utm_medium=PBWeb&sub=100001

	// https://analrz.com/video/305129/mature-milf-paris-lincoln-tries-anal-sex-with-her-boyfriend-alex-adams/?utm_campaign=tf
	// https://blackporn.tube/video/10465497/step-sis-sharing-bed-with-sneaky-best-friend-cums-hard-on-stepbros-cock/?campaign=10146
	// https://www.nuvid.club/video/8482657/big-titted-blonde-step-mom-wants-to-share-bed-with-me
	// https://givemeaporn.com/video/stepsister-s-hard-lesson-from-porn-addiction-to-steamy-stepbro-action?utm_source=awn-rse&utm_medium=inc&utm_campaign=nov01

	console.log(`\n\n=== Testing:`);
	const directoryPath = '/Users/arijit/Downloads/';

	try {
		await new ZbPornProvider('https://zbporn.tv/videos/614357/dude-fucks-his-petite-stepsis-till-cum-on-her-body/')
			.setJobOptions({ logProgress: true })
			.setTransformOutput(true)
			.setOutput(OutputType.JSON, { directoryPath: 'test/providers' })
			.getVideo();
	} catch (error) {
		console.error(error);
		if (error instanceof Error) console.error(error.stack);
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

async function main() {
	const url1 = 'https://ok.porn/albums/1300/';
	console.log(`\n\n=== Testing:`);

	try {
		await new OkPornService(url1)
			.setJobOptions({ logProgress: true })
			.onProgress((event) => console.log(event))
			.setAllowedExtensions('mp4')
			.setOutput(OutputType.DEVICE)
			.getVideo('68664');
	} catch (error) {
		console.error('Error during getAlbum:', error instanceof Error ? error.message : String(error));
	} finally {
		console.log(`\n\n=== Done testing ===`);
	}
}

main().catch(console.error);

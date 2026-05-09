import * as fs from 'fs';
import * as path from 'path';

const INDEX_FILE_NAME = 'index.ts';

export const makeIndex = async (directory: string) => {
	const dirPath = path.join(__dirname, '..', directory);
	console.log(`Making index file in ${directory}`);

	const files = fs
		.readdirSync(dirPath)
		.filter((file) => file !== INDEX_FILE_NAME)
		.filter((file) => !file.startsWith('.')) // Exclude hidden files like .DS_Store
		.filter((file) => file.endsWith('.ts') || fs.statSync(path.join(dirPath, file)).isDirectory()); // Only .ts files or directories
	console.log(`Found ${files.length} ${files.length > 1 ? 'files' : 'file'}`);

	if (!files.length) return;

	const indexFileContent = files.map((file) => `export * from './${file.replace(/\.ts$/g, '')}';`).join('\n');
	const indexPath = path.join(__dirname, '..', directory, INDEX_FILE_NAME);
	console.log(`Writing to file ${directory}/index.ts`);

	fs.writeFileSync(indexPath, indexFileContent.concat('\n'), { flag: 'w' });
};

const getDirectories = (dir: string, dirPaths: string[] = []) => {
	dirPaths.push(dir);

	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			getDirectories(path.join(dir, entry.name), dirPaths);
		}
	}

	return dirPaths;
};

(async () => {
	for (const path of getDirectories('./src')) await makeIndex(path);
})();

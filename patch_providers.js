const fs = require('fs');

const { execSync } = require('child_process');
const paths = execSync('find packages/providers -name "*Provider.ts"').toString().split('\n').filter(Boolean);

paths.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');

    // Check if it already has sniSpoofing
    if (content.includes('sniSpoofing:')) {
        console.log(`Already patched: ${file}`);
        return;
    }

    // Determine the status
    let status = 'untested';
    if (file.includes('EPornerProvider')) status = 'working';
    if (file.includes('XnXXProvider') || file.includes('XVideosProvider')) status = 'failed';

    // replace `needsBrowser: boolean` with `needsBrowser: boolean,\n\t\t\t\tsniSpoofing: '${status}'`
    const regex = /(needsBrowser:\s*(?:true|false))\n/g;

    content = content.replace(regex, `$1,\n\t\t\t\tsniSpoofing: '${status}'\n`);

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Patched ${file} with status: ${status}`);
});

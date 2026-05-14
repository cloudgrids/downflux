const html = `<source id="video_source_3" src="https://mylust.com/get_file/1/31ed5633665eaef8c48a8f08513750a1d62ee76787/969000/969432/969432_1080p.mp4/?br=1961" type="video/mp4" title="1080p" data-fluid-hd="true">`;

const regex = /<source\b([^>]+)>/gi;
const results: Array<Record<string, string>> = [];
let match;
while ((match = regex.exec(html)) !== null) {
    const attrsString = match[1];
    const attrs: Record<string, string> = {};
    const attrRegex = /([a-zA-Z0-9\-:]+)\s*=\s*(["'])(.*?)\2/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
        attrs[attrMatch[1]] = attrMatch[3];
    }
    results.push(attrs);
}
console.log(results);

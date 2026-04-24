const { Pool } = require('undici');
const pool = new Pool('https://httpbin.org');
pool.request({
    path: '/redirect-to?url=' + encodeURIComponent('https://httpbin.org/get'),
    method: 'GET',
    maxRedirections: 5
}).then(async ({ statusCode, headers, body }) => {
    let str = '';
    for await (const chunk of body) str += chunk;
    console.log(statusCode, str.slice(0, 100));
}).catch(console.error);

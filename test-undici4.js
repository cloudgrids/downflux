const { Pool, interceptors } = require('undici');
const pool = new Pool('https://httpbin.org');
const poolWithRedirect = pool.compose(interceptors.redirect({ maxRedirections: 5 }));

poolWithRedirect.request({
    path: '/redirect-to?url=' + encodeURIComponent('https://example.com/'),
    method: 'GET'
}).then(async ({ statusCode, headers, body }) => {
    let str = '';
    for await (const chunk of body) str += chunk;
    console.log(statusCode, str.slice(0, 100));
}).catch(console.error);

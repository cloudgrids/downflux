const { Pool, interceptors } = require('undici');
const pool = new Pool('https://example.com');
const poolWithRedirect = pool.compose(interceptors.redirect({ maxRedirections: 5 }));

poolWithRedirect.request({
    path: '/',
    method: 'GET'
}).then(async ({ statusCode, headers, body }) => {
    let str = '';
    for await (const chunk of body) str += chunk;
    console.log(statusCode, str.slice(0, 100));
}).catch(console.error);

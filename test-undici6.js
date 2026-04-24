const { fetch, Pool } = require('undici');
const pool = new Pool('https://httpbin.org');
fetch('https://httpbin.org/redirect-to?url=' + encodeURIComponent('https://example.com/'), { dispatcher: pool, redirect: 'follow' }).then(async (res) => {
    console.log(res.url, res.status);
}).catch(console.error);

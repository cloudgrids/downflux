const { fetch, Pool } = require('undici');
const pool = new Pool('https://example.com');
fetch('https://example.com/', { dispatcher: pool }).then(async (res) => {
    console.log(res.url, res.status);
    console.log((await res.text()).slice(0, 50));
}).catch(console.error);

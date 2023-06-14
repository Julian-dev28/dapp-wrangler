const axios = require('axios');

const url = 'https://dapp-wrangler.julian-martinez.workers.dev/courses?courses=';

axios
  .get(url)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

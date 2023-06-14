const fetch = require('node-fetch');

async function getCourses() {
  try {
    const response = await fetch('https://dapp-wrangler.julian-martinez.workers.dev/courses?courses=');
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCourses();

import { handleGetPubkey } from './putKey';
import { handleUrl } from './putUrl';

addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const path = url.pathname.split('/')[1];

  switch (path) {
    case 'pubkey':
      event.respondWith(handleGetPubkey(request));
      break;
    case 'url':
      event.respondWith(handleUrl(request));
      break;
    default:
      event.respondWith(new Response('Not Found', { status: 404 }));
      break;
  }
});

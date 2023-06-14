declare const dapp_course: KVNamespace;

export async function handleUrl(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.split('/')[1]; // ['courses','']

  switch (request.method) {
    case 'GET':
      if (path === 'url') {
        const value = await dapp_course.get('url');
        return new Response(value || 'No course data found', { status: value ? 200 : 404 });
      } else {
        return new Response('Invalid route', { status: 404 });
      }

    case 'PUT':
      if (path === 'url') {
        const body = await request.json(); // Parse the request body as JSON
        await dapp_course.put('url', JSON.stringify(body));
        return new Response('url updated', { status: 200 });
      } else {
        return new Response('Invalid route', { status: 404 });
      }

    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

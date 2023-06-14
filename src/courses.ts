declare const dapp_course: KVNamespace;

export async function handleGetCourses(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.split('/')[1]; // ['courses','']

  switch (request.method) {
    case 'GET':
      if (path === 'courses') {
        const value = await dapp_course.get('courses');
        return new Response(value || 'No course data found', { status: value ? 200 : 404 });
      } else {
        return new Response('Invalid route', { status: 404 });
      }

    case 'PUT':
      if (path === 'courses') {
        const body = await request.text();
        await dapp_course.put('courses', body);
        return new Response('Course data updated', { status: 200 });
      } else {
        return new Response('Invalid route', { status: 404 });
      }

    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

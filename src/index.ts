export type Env = {
  dapp_course: KVNamespace;
};

export type Body = {
  publickey: string;
  url: string;
};

export type ListMetadata = {
  metadata: { url: string };
};

export type ListData = {
  publickey: string
  url: string
}[];

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      switch (request.method) {
        case 'OPTIONS': {
          return new Response(null, { status: 204, headers });
        }

        case 'GET': {
          const list = await env.dapp_course.list<{ url: string }>();
          const data: ListData = [];

          for (const key of list.keys) {
            if (!key.metadata?.url)
              continue;

            data.push({
              publickey: key.name,
              url: key.metadata.url
            });
          }

          return Response.json(data, { headers });
        }

        case 'POST': {
          const body: Body = await request.json(); // Parse the request body as JSON

          if (!body.publickey)
            return new Response('Missing publickey!', { status: 422, headers });

          if (!body.url)
            return new Response('Missing url!', { status: 422, headers });

          await env.dapp_course.put(body.publickey, body.url, { metadata: { url: body.url } });

          return new Response(null, { status: 204, headers });
        }

        default: {
          return new Response(null, { status: 404, headers });
        }
      }
    } catch (err) {
      console.error(err)
      return new Response((err as Error)?.stack ?? null, { status: 500, headers });
    }
  },
};

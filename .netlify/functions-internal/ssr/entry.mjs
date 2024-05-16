import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CdS3RpGF.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_B0feq_Um.mjs');
const _page1 = () => import('./chunks/_id__Db5e3fvy.mjs');
const _page2 = () => import('./chunks/index_Tci7UA0G.mjs');
const _page3 = () => import('./chunks/index_CgyVdOyW.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/goals/[id].ts", _page1],
    ["src/pages/api/goals/index.ts", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "ecb0c9bc-9bff-4a50-9f68-6cdcd6bcc025"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

import { renderers } from './renderers.mjs';
import { manifest } from './manifest_DNEHJqY4.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_Dk_spqf_.mjs');
const _page1 = () => import('./chunks/_id__Db5e3fvy.mjs');
const _page2 = () => import('./chunks/index_CrogR7Dr.mjs');
const _page3 = () => import('./chunks/index_CzGvZdd2.mjs');
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
    "middlewareSecret": "4ec12f0d-c3be-4543-b2a3-24d0d4f6665d"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

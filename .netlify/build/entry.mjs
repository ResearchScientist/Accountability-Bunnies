import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_bZd8vClZ.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/bunnies/updated.astro.mjs');
const _page2 = () => import('./pages/api/bunnies/_id_.astro.mjs');
const _page3 = () => import('./pages/api/bunnies.astro.mjs');
const _page4 = () => import('./pages/api/goals/complete.astro.mjs');
const _page5 = () => import('./pages/api/goals/completed.astro.mjs');
const _page6 = () => import('./pages/api/goals/_id_.astro.mjs');
const _page7 = () => import('./pages/api/goals.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/bunnies/updated.ts", _page1],
    ["src/pages/api/bunnies/[id].ts", _page2],
    ["src/pages/api/bunnies/index.ts", _page3],
    ["src/pages/api/goals/complete.ts", _page4],
    ["src/pages/api/goals/completed.ts", _page5],
    ["src/pages/api/goals/[id].ts", _page6],
    ["src/pages/api/goals/index.ts", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "be2ba8a5-e3ca-472e-98f5-3ffb485151a6"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

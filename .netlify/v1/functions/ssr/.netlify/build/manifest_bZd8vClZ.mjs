import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_aDRQffPB.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/Accountability-Bunnies/","cacheDir":"file:///workspaces/Accountability-Bunnies/node_modules/.astro/","outDir":"file:///workspaces/Accountability-Bunnies/dist/","srcDir":"file:///workspaces/Accountability-Bunnies/src/","publicDir":"file:///workspaces/Accountability-Bunnies/public/","buildClientDir":"file:///workspaces/Accountability-Bunnies/dist/","buildServerDir":"file:///workspaces/Accountability-Bunnies/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/bunnies/updated","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/bunnies\\/updated\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"bunnies","dynamic":false,"spread":false}],[{"content":"updated","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/bunnies/updated.ts","pathname":"/api/bunnies/updated","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/bunnies/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/bunnies\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"bunnies","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/bunnies/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/bunnies","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/bunnies\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"bunnies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/bunnies/index.ts","pathname":"/api/bunnies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/goals/complete","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/goals\\/complete\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"goals","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/goals/complete.ts","pathname":"/api/goals/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/goals/completed","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/goals\\/completed\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"goals","dynamic":false,"spread":false}],[{"content":"completed","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/goals/completed.ts","pathname":"/api/goals/completed","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/goals/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/goals\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"goals","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/goals/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/goals","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/goals\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"goals","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/goals/index.ts","pathname":"/api/goals","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.C53AFG8A.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/Accountability-Bunnies/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/bunnies/updated@_@ts":"pages/api/bunnies/updated.astro.mjs","\u0000@astro-page:src/pages/api/bunnies/[id]@_@ts":"pages/api/bunnies/_id_.astro.mjs","\u0000@astro-page:src/pages/api/bunnies/index@_@ts":"pages/api/bunnies.astro.mjs","\u0000@astro-page:src/pages/api/goals/complete@_@ts":"pages/api/goals/complete.astro.mjs","\u0000@astro-page:src/pages/api/goals/completed@_@ts":"pages/api/goals/completed.astro.mjs","\u0000@astro-page:src/pages/api/goals/[id]@_@ts":"pages/api/goals/_id_.astro.mjs","\u0000@astro-page:src/pages/api/goals/index@_@ts":"pages/api/goals.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_bZd8vClZ.mjs","/workspaces/Accountability-Bunnies/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BWjKGCxv.mjs","/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CMG1tDXG.js","/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=2&lang.ts":"_astro/index.astro_astro_type_script_index_2_lang.DsgSraxY.js","/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=1&lang.ts":"_astro/index.astro_astro_type_script_index_1_lang.B0rtWz2l.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=2&lang.ts","const s=document.querySelector(\"#main-navigation\"),r=document.querySelector(\"#show-menu-button\"),a=document.querySelector(\"#lets-go-button\"),l=document.querySelector(\"#splash-screen\"),e=document.querySelector(\"#main-menu\"),u=document.querySelectorAll(\".nav-section\");s.addEventListener(\"click\",i);r.addEventListener(\"click\",d);a.addEventListener(\"click\",m);function i(t){u.forEach(c=>{c.style.zIndex=\"0\"});let n=t.target.dataset.menu,o=document.querySelector(`#${n}`);o.style.zIndex=\"1\",e.style.transform=\"translateY(-102dvh)\"}function d(){e.style.transform=\"translateY(0dvh)\"}function m(){l.style.transform=\"translateY(-102dvh)\"}"]],"assets":["/_astro/index.C53AFG8A.css","/apple-touch-icon.png","/bunnyBlue.svg","/bunnyBlueGone.svg","/bunnyGreen.svg","/bunnyGreenGone.svg","/bunnyLightBlue.svg","/bunnyLightBlueGone.svg","/bunnyLightOrange.svg","/bunnyLightOrangeGone.svg","/bunnyOrange.svg","/bunnyOrangeGone.svg","/bunnyPink.svg","/bunnyPinkGone.svg","/bunnyRed.svg","/bunnyRedGone.svg","/bunnyYellow.svg","/bunnyYellowGone.svg","/bunnyface.svg","/farm.svg","/favicon-media.svg","/favicon.svg","/goalLine.svg","/sun.svg","/tikbox.svg","/tikedfilled.svg","/_astro/index.astro_astro_type_script_index_0_lang.CMG1tDXG.js","/_astro/index.astro_astro_type_script_index_1_lang.B0rtWz2l.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"2mtQ2RTjBLiaN6zW/juf6m4b/c8R3/HY3lLiNkhPAzY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

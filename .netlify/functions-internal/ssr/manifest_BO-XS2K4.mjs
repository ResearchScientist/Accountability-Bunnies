import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_r0D85r7m.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
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
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DsgSraxY.js"}],"styles":[{"type":"external","src":"/_astro/bunny-farm.CofkaGX8.css"},{"type":"inline","content":"header[data-astro-cid-aztlmaaa]{width:100%;height:100px;grid-column:2;grid-row:1;display:grid;grid-template-columns:100px 1fr 100px;grid-template-rows:100px;justify-content:center;align-items:center;text-align:center;background-color:var(--background-colour)}h1[data-astro-cid-aztlmaaa]{grid-column:1/-1;grid-row:1;font-size:40px;font-family:Annie Use Your Telescope,cursive;font-weight:400;font-style:normal;text-align:center}nav[data-astro-cid-aztlmaaa]{grid-column:-1/-2;grid-row:1}nav[data-astro-cid-aztlmaaa] a[data-astro-cid-aztlmaaa]{font-family:Annie Use Your Telescope,cursive;font-size:18px;font-weight:400;font-style:normal;text-align:center}#farm[data-astro-cid-j3mr7brm]{padding:0 90px 0 0;grid-column:1/-1;grid-row:1;justify-self:center}main[data-astro-cid-j3mr7brm]{width:100%;display:grid;grid-template-columns:1fr;grid-template-rows:300px 1fr;justify-items:flex-start}#bunny-pen[data-astro-cid-j3mr7brm]{width:100%;height:100%;position:relative;grid-column:1;grid-row:2;overflow:hidden}.bunny[data-astro-cid-j3mr7brm]{width:58px;position:absolute;top:0;left:0}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(1){left:85%}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(2){left:8%}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(3){left:0%}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(4){top:20%;left:30%}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(5){top:50%;left:60%}.bunny[data-astro-cid-j3mr7brm]:nth-last-of-type(6){top:75%;left:25%}.hop[data-astro-cid-j3mr7brm]{animation:9s ease-in-out infinite hop}.bunny-hop[data-astro-cid-j3mr7brm]{animation:1.1s ease-in alternate infinite bunny-hop}@keyframes bunny-hop{0%{transform:translateY(30px)}50%{transform:translate(10px)}to{transform:translate(20px,30px)}}@keyframes hop{0%{transform:translate(700px,50px)}2.5%{transform:translate(700px,50px)}6.25%{transform:translate(600px)}11.25%{transform:translate(575px,50px)}13.75%{transform:translate(575px,50px)}17.5%{transform:translate(475px)}22.5%{transform:translate(450px,50px)}25%{transform:translate(450px,50px)}28.75%{transform:translate(350px)}33.75%{transform:translate(325px,50px)}36.25%{transform:translate(325px,50px)}40%{transform:translate(225px)}45%{transform:translate(200px,50px)}47.5%{transform:translate(200px,50px)}51.25%{transform:translate(100px)}51.25%{transform:translate(75px)}}\n"}],"routeData":{"route":"/bunny-farm","isIndex":false,"type":"page","pattern":"^\\/bunny-farm\\/?$","segments":[[{"content":"bunny-farm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bunny-farm.astro","pathname":"/bunny-farm","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.7HYgkuz9.js"}],"styles":[{"type":"external","src":"/_astro/bunny-farm.CofkaGX8.css"},{"type":"inline","content":"section[data-astro-cid-j7pv25f6]{width:100%;height:100%;grid-column:1/-1;grid-row:1/-1;display:flex;flex-direction:column;justify-content:center;align-items:center;transform:translateY(0);transition:transform .75s ease-in-out;background-color:var(--background-colour);box-shadow:0 0 20px #00000080;z-index:0}.splash-screen[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:1fr;grid-template-rows:15dvh minmax(50px,10dvh) 40dvh 1fr;justify-items:center;align-items:center;transform:translateY(0);z-index:4}.main-menu[data-astro-cid-j7pv25f6]{z-index:3}.main-menu[data-astro-cid-j7pv25f6] nav[data-astro-cid-j7pv25f6]{height:250px;display:flex;flex-direction:column;justify-content:space-between;align-items:center}.main-menu[data-astro-cid-j7pv25f6] nav[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]:nth-of-type(1){width:130px}.main-menu[data-astro-cid-j7pv25f6] nav[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]:nth-of-type(2){width:80px}.main-menu[data-astro-cid-j7pv25f6] nav[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]:nth-of-type(3){width:164px}#show-menu-button[data-astro-cid-j7pv25f6]{margin:10px 10px 0 0;width:100px;height:50px;grid-column:1/-1;grid-row:1/-1;align-self:flex-start;justify-self:flex-end;font-size:24px;z-index:2}.reset-z-index[data-astro-cid-j7pv25f6]{z-index:0}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/Accountability-Bunnies/src/pages/bunny-farm.astro",{"propagation":"none","containsHead":true}],["/workspaces/Accountability-Bunnies/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CDRBrclW.mjs","/src/pages/index.astro":"chunks/pages/index_DuWQ2Oi9.mjs","\u0000@astrojs-manifest":"manifest_BO-XS2K4.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CJ5ueRVZ.mjs","\u0000@astro-page:src/pages/bunny-farm@_@astro":"chunks/bunny-farm_CuxDwJI3.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BFQNMe1P.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.7HYgkuz9.js","/astro/hoisted.js?q=1":"_astro/hoisted.DsgSraxY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/bunny-farm.CofkaGX8.css","/bunnyBlue.svg","/bunnyBlueGone.svg","/bunnyGreen.svg","/bunnyGreenGone.svg","/bunnyLightBlue.svg","/bunnyLightBlueGone.svg","/bunnyLightOrange.svg","/bunnyLightOrangeGone.svg","/bunnyOrange.svg","/bunnyOrangeGone.svg","/bunnyPink.svg","/bunnyPinkGone.svg","/bunnyRed.svg","/bunnyRedGone.svg","/bunnyYellow.svg","/bunnyYellowGone.svg","/bunnyface.svg","/farm.svg","/favicon.svg","/goalLine.svg","/sun.svg","/tikbox.svg","/tiked.svg","/tikedfilled.svg","/tikedtiked.svg","/_astro/hoisted.7HYgkuz9.js","/_astro/hoisted.DsgSraxY.js"],"buildFormat":"directory"});

export { manifest };

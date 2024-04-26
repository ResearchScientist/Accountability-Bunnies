import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_BwXg7fSy.mjs';
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

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const E=new Date,k={weekday:\"long\"};let C=new Intl.DateTimeFormat(\"en-US\",k).format(E);const c=document.querySelector(\"#sun\"),r=document.querySelector(\"#tap-farm-msg\"),l=document.querySelector(\"#tap-farm-button\"),a=document.querySelector(\"#dont-tap-farm-msg\"),m=document.querySelector(\"#dont-tap-farm-button\"),y=document.querySelector(\"#counting-bunnies-msg\"),g=[\"bunnyBlue.svg\",\"bunnyGreen.svg\",\"bunnyOrange.svg\",\"bunnyPink.svg\",\"bunnyLightBlue.svg\",\"bunnyRed.svg\",\"bunnyYellow.svg\",\"bunnyLightOrange.svg\"],b=document.querySelector(\"#bunny-pen\");let p=[],v=1;c.addEventListener(\"click\",q);l.addEventListener(\"click\",h);m.addEventListener(\"click\",B);b.addEventListener(\"click\",A);function q(){c.classList.add(\"sunSpin\"),c.onanimationend=()=>{c.classList.remove(\"sunSpin\")}}function x(){C==\"Thursday\"?(r.style.display=\"inline\",l.style.display=\"inline\"):(r.style.display=\"none\",l.style.display=\"none\",a.style.display=\"inline\",m.style.display=\"inline\")}x();let d=0;function B(){const t=[\"Why?\",\"Really?\",\"bruh ...\",\"aw come on\",\"dude no\",\"wooooow\",\"don't tap yet\",\"stop\"];d++,d==1?a.textContent=\"It's not Saturday !\":d==4?(a.textContent=\"no mas\",m.style.display=\"none\",setTimeout(function(){a.style.display=\"none\"},2e3)):a.textContent=t[Math.floor(Math.random()*t.length)]}function h(){console.log(`counting ${v} bunnies`),r.style.display=\"none\",l.style.display=\"none\",y.style.display=\"inline\",l.removeEventListener(\"click\",h),setTimeout(function(){y.textContent=\"counting bunnies\"},200),setTimeout(T,2e3)}function T(){console.log(\"making bunnies\");for(let t=0;t<v;t++)w(t)}function w(t){setTimeout(function(){const e=document.createElement(\"img\");let n=Math.random()*86+15,o=Math.random()*85;e.src=g[t%g.length],e.classList.add(\"bunnyAppear\",\"bunny\"),e.style.top=`calc( ${n}% - 108px)`,e.style.left=`${o}%`,b.appendChild(e),p.push(e),M(p)},400*t)}function M(t){t.forEach((e,n)=>{e.setAttribute(\"id\",`bunny${n+1}`)}),console.log(t)}function A(t){t.target.classList.add(\"bunnyHop\");let e=t.target.getBoundingClientRect(),n=t.target.offsetLeft;console.log(n),console.log(e),t.target.onanimationend=()=>{t.target.classList.remove(\"bunnyAppear\",\"bunnyHop\",\"bunnyLeft\",\"bunnyRight\")}}const f=document.querySelector(\"#input-goal\"),F=document.querySelector(\"#add-goal-button\"),S=document.querySelector(\"#goals-section\");document.querySelector(\"#delete-goal-button\");F.addEventListener(\"click\",G);function G(t){t.preventDefault();let e=f.value;if(e){let n=document.createElement(\"li\"),o=document.createElement(\"img\"),u=document.createElement(\"div\"),s=document.createElement(\"button\"),i=document.createElement(\"button\");s.addEventListener(\"click\",I),i.addEventListener(\"click\",$),n.classList.add(\"goal-item\"),o.src=\"tikbox.svg\",o.classList.add(\"tikbox\"),u.textContent=e,u.classList.add(\"goal-text\"),s.classList.add(\"complete-goal-button\"),s.setAttribute(\"data-goal-complete\",\"no\"),i.textContent=\"x\",i.classList.add(\"delete-goal-button\"),n.append(o,s,u,i),S.appendChild(n)}f.value=\"\"}function I(t){console.log(\"complete goal\"),t.target.dataset.goalComplete==\"no\"?(t.target.dataset.goalComplete=\"yes\",t.target.parentElement.firstElementChild.src=\"tikedfilled.svg\"):t.target.dataset.goalComplete==\"yes\"&&(t.target.dataset.goalComplete=\"no\",t.target.parentElement.firstElementChild.src=\"tikbox.svg\"),console.log(t.target.dataset.goalComplete)}function $(t){console.log(\"delete goal\");let e=t.target.parentElement;S.removeChild(e)}const P=document.querySelector(\"#main-navigation\"),R=document.querySelector(\"#show-menu-button\"),Y=document.querySelector(\"#lets-go-button\"),D=document.querySelector(\"#splash-screen\"),L=document.querySelector(\"#main-menu\"),H=document.querySelectorAll(\".nav-section\");P.addEventListener(\"click\",O);R.addEventListener(\"click\",z);Y.addEventListener(\"click\",N);function O(t){H.forEach(o=>{o.style.zIndex=\"0\"});let e=t.target.dataset.menu,n=document.querySelector(`#${e}`);n.style.zIndex=\"1\",L.style.transform=\"translateY(-102dvh)\"}function z(){L.style.transform=\"translateY(0dvh)\"}function N(){D.style.transform=\"translateY(-102dvh)\"}\n"}],"styles":[{"type":"external","src":"/_astro/index.BhNv7XTd.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/Accountability-Bunnies/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_Dw6SmbdW.mjs","/src/pages/index.astro":"chunks/pages/index_DGLz3Scc.mjs","\u0000@astrojs-manifest":"manifest_PlgaDtwP.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CljHg5uy.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_d431_kSA.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.qx648oiu.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BhNv7XTd.css","/bunnyBlue.svg","/bunnyBlueGone.svg","/bunnyGreen.svg","/bunnyGreenGone.svg","/bunnyLightBlue.svg","/bunnyLightBlueGone.svg","/bunnyLightOrange.svg","/bunnyLightOrangeGone.svg","/bunnyOrange.svg","/bunnyOrangeGone.svg","/bunnyPink.svg","/bunnyPinkGone.svg","/bunnyRed.svg","/bunnyRedGone.svg","/bunnyYellow.svg","/bunnyYellowGone.svg","/bunnyface.svg","/farm.svg","/favicon.svg","/goalLine.svg","/sun.svg","/tikbox.svg","/tiked.svg","/tikedfilled.svg","/tikedtiked.svg"],"buildFormat":"directory"});

export { manifest };

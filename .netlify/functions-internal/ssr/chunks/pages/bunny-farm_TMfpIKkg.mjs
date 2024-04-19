import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, m as maybeRenderHead, h as renderComponent } from '../astro_r0D85r7m.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                               */
/* empty css                               */

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Annie+Use+Your+Telescope&family=Life+Savers:wght@400;700;800&family=Pavanam&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <main> ${renderSlot($$result, $$slots["default"])} </main>  </body></html>`;
}, "/workspaces/Accountability-Bunnies/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$HeaderBack = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeaderBack;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-aztlmaaa> <h1 data-astro-cid-aztlmaaa>${title}</h1> <nav data-astro-cid-aztlmaaa> <a href="/main-menu" data-astro-cid-aztlmaaa><svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-aztlmaaa> <path d="M0 9.90625C0 9.86458 0 9.8125 0 9.75C0.0208333 9.66667 0.0416667 9.625 0.0625 9.625L6.65625 0.625H7.375C7.375 1.125 7.26042 1.65625 7.03125 2.21875C6.82292 2.78125 6.54167 3.34375 6.1875 3.90625C5.85417 4.44792 5.46875 4.97917 5.03125 5.5C4.59375 6.02083 4.16667 6.51042 3.75 6.96875C3.35417 7.40625 2.97917 7.80208 2.625 8.15625C2.29167 8.51042 2.03125 8.79167 1.84375 9V10.1875C2.03125 10.25 2.29167 10.3646 2.625 10.5312C2.97917 10.6771 3.375 10.8542 3.8125 11.0625C4.25 11.25 4.69792 11.4479 5.15625 11.6562C5.63542 11.8646 6.09375 12.0729 6.53125 12.2812C6.96875 12.4896 7.35417 12.6771 7.6875 12.8438C8.04167 13.0104 8.29167 13.125 8.4375 13.1875C8.5 13.2292 8.59375 13.3021 8.71875 13.4062C8.84375 13.5104 8.96875 13.625 9.09375 13.75C9.21875 13.875 9.33333 14 9.4375 14.125C9.5625 14.25 9.63542 14.3438 9.65625 14.4062C9.53125 14.6562 9.40625 14.8229 9.28125 14.9062C9.15625 14.9896 8.98958 15.0312 8.78125 15.0312C8.61458 15.0312 8.28125 14.9167 7.78125 14.6875C7.28125 14.4583 6.70833 14.1771 6.0625 13.8438C5.41667 13.4896 4.73958 13.1146 4.03125 12.7188C3.32292 12.3021 2.66667 11.9062 2.0625 11.5312C1.47917 11.1354 0.989583 10.7917 0.59375 10.5C0.197917 10.2083 0 10.0104 0 9.90625Z" fill="black" data-astro-cid-aztlmaaa></path> <path d="M11.3125 7.8125C11.3125 7.79167 11.5417 7.75 12 7.6875C12.4792 7.60417 13.0833 7.52083 13.8125 7.4375C14.5417 7.35417 15.3646 7.27083 16.2812 7.1875C17.1979 7.10417 18.125 7.02083 19.0625 6.9375C19.1458 6.9375 19.3125 6.9375 19.5625 6.9375C19.8125 6.91667 20.0625 6.90625 20.3125 6.90625C20.5833 6.88542 20.8333 6.875 21.0625 6.875C21.3125 6.85417 21.4896 6.84375 21.5938 6.84375C21.5938 7.11458 21.5312 7.36458 21.4062 7.59375C21.3021 7.82292 21.125 8 20.875 8.125C20.375 8.1875 19.75 8.26042 19 8.34375C18.25 8.40625 17.4792 8.47917 16.6875 8.5625C15.8958 8.64583 15.125 8.72917 14.375 8.8125C13.625 8.89583 13 8.95833 12.5 9C12.4583 9 12.3542 9.01042 12.1875 9.03125C12.0417 9.03125 11.9271 9.03125 11.8438 9.03125C11.5729 9.03125 11.3438 9.01042 11.1562 8.96875C10.9688 8.92708 10.8125 8.73958 10.6875 8.40625L11.3125 7.8125Z" fill="black" data-astro-cid-aztlmaaa></path> </svg> go back</a> </nav> </header> `;
}, "/workspaces/Accountability-Bunnies/src/components/HeaderBack.astro", void 0);

const $$Astro = createAstro();
const $$BunnyFarm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BunnyFarm;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bunny Farm", "data-astro-cid-j3mr7brm": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderBack", $$HeaderBack, { "title": "bunny farm", "data-astro-cid-j3mr7brm": true })} ${maybeRenderHead()}<main data-astro-cid-j3mr7brm> <img id="farm" src="/farm.svg" alt="Line illustration of a farm and sun." data-astro-cid-j3mr7brm> <div id="bunny-pen" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyBlue.svg" alt="blue bunny" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyGreen.svg" alt="green bunny" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyYellow.svg" alt="yellow bunny" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyLightBlue.svg" alt="light blue bunny" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyOrange.svg" alt="orange bunny" data-astro-cid-j3mr7brm> <img class="bunny" src="/bunnyLightOrange.svg" alt="lignt orange bunny" data-astro-cid-j3mr7brm> </div> </main> ` })} `;
}, "/workspaces/Accountability-Bunnies/src/pages/bunny-farm.astro", void 0);

const $$file = "/workspaces/Accountability-Bunnies/src/pages/bunny-farm.astro";
const $$url = "/bunny-farm";

const bunnyFarm = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$BunnyFarm,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, bunnyFarm as b };
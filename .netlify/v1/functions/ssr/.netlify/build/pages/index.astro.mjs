import { e as createComponent, r as renderTemplate, g as addAttribute, i as renderHead, j as renderSlot, h as createAstro, k as renderComponent, l as renderScript, m as maybeRenderHead } from '../chunks/astro/server_aDRQffPB.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                 */
import { d as db, G as Goals } from '../chunks/_astro_db_CvD9x3DU.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Annie+Use+Your+Telescope&family=Life+Savers:wght@400;700;800&family=Pavanam&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Accountability Bunnies</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/workspaces/Accountability-Bunnies/src/layouts/Layout.astro", undefined);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const goalsDB = await db.select().from(Goals);
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const description = formData.get("description");
    const completed = formData.get("completed");
    if (typeof description === "string" && typeof completed === "string") {
      await db.insert(Goals).values({ description, completed });
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accountability Bunnies" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section id="check-ins" class="nav-section"> <h1>Check Ins</h1> <div id="check-ins-content-section"> <h2>Ideal Scenario</h2> <p class="check-ins-content">Imagine your ultimate goal. The location, the people, your role. Close your eyes and imagine the tastes and smells surrounding you. The temperature. The feeling of the air on your skin. And the feeling of the things you are touching. Imagine how you feel. Write it all down.</p> <p class="check-ins-content">Keep it somewhere where you can easily find it, like a note on your night stand, or hidden between your matresses, or pinned up inside your closet. Find a place where you can easily glance at it when you feel overwhelmed and close your eyes.</p> <h2>Weekly</h2> <p class="check-ins-content">Each Saturday at 7pm send a text saying if goal was met and if not, why.</p> <h2>Monthly</h2> <p class="check-ins-content">On last day of the month have a call to talk about how things are going.</p> </div> </section> <section id="goals" class="nav-section"> <h1>This Week's Goals</h1> <form id="input-goal-form" action="/api/goals" method="POST"> <img id="goalLine" src="goalLine.svg" alt="hand drawn line"> <input id="input-goal" type="text" name="description" placeholder="write your goal here" pattern="^(?! *$)[a-zA-Z0-9,. ]+$" required> <button id="add-goal-button" type="submit">+</button> </form> <ul id="goals-section"> ${goalsDB.map(({ id, description, completed }) => renderTemplate`<li class="goal-item"> <img class="tikbox" src="tikbox.svg" alt="hand drawn tikbox"> <button class="complete-goal-button" type="button" aria-label="toggle complete goal"${addAttribute(id, "data-id")}${addAttribute(completed, "data-goalcomplete")}></button> <div class="goal-text">${description}</div> <button id="delete-goal-button" class="delete-goal-button"${addAttribute(id, "data-id")} type="button">x</button> </li>`)} </ul> </section> <section id="bunny-farm" class="nav-section"> <img id="farm" src="/farm.svg" alt="Line illustration of a farm."> <img id="sun" src="/sun.svg" alt="Line illustration of a sun."> <p id="counting-bunnies-msg"></p> <p id="dont-tap-farm-msg">Tap the farm on Saturday.</p> <p id="tap-farm-msg">Tap the farm !</p> <button id="dont-tap-farm-button">don't tap</button> <button id="tap-farm-button">tap here</button> <div id="bunny-pen"></div> <div id="bunny-count-msg">20 bunnies have joined the farm</div> <div id="bunny-roll"></div> <div id="bunny-joke-bubble"></div> </section> <section id="main-menu" class="main-menu"> <nav id="main-navigation"> <button class="nav-button" data-menu="check-ins">check ins</button> <button class="nav-button" data-menu="goals">goals</button> <button class="nav-button" data-menu="bunny-farm">bunny farm</button> </nav> </section> <section id="splash-screen" class="splash-screen"> <h1 id="app-title">Ac<span class="text-accent">count</span>ability</h1> <h2 id="app-sub-title">Bunnies</h2> <img id="bunny-face" src="/bunnyface.svg" alt="line art of a bunny"> <button id="lets-go-button">let's go</button> </section> <button id="show-menu-button">menu</button> </main> ` })} ${renderScript($$result, "/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "/workspaces/Accountability-Bunnies/src/pages/index.astro?astro&type=script&index=2&lang.ts")}`;
}, "/workspaces/Accountability-Bunnies/src/pages/index.astro", undefined);

const $$file = "/workspaces/Accountability-Bunnies/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

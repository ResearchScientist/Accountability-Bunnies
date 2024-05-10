import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent, m as maybeRenderHead } from '../astro_BVCA0lm3.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/virtual.js';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Annie+Use+Your+Telescope&family=Life+Savers:wght@400;700;800&family=Pavanam&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/workspaces/Accountability-Bunnies/src/layouts/Layout.astro", void 0);

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const Goals = asDrizzleTable("Goals", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Goals", "primaryKey": true } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Goals", "primaryKey": false, "optional": false } }, "completed": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "completed", "collection": "Goals", "default": "no", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
asDrizzleTable("Bunnies", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Bunnies", "primaryKey": true } }, "totalBunnies": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "totalBunnies", "collection": "Bunnies", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const description = formData.get("description");
    const completed = formData.get("completed");
    if (typeof description === "string" && typeof completed === "string") {
      await db.insert(Goals).values({ description, completed });
    }
  }
  const goalsDB = await db.select().from(Goals);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accountability Bunnies" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section id="check-ins" class="nav-section"> <h1>Check Ins</h1> <div id="check-ins-content-section"> <h2>Ideal Scenario</h2> <p class="check-ins-content">Imagine your ultimate goal. The location, the people, your role. Close your eyes and imagine the tastes and smells surrounding you. The temperature. The feeling of the air on your skin. And the feeling of the things you are touching. Imagine how you feel. Write it all down.</p> <p class="check-ins-content">Keep it somewhere where you can easily find it, like a note on your night stand, or hidden between your matresses, or pinned up inside your closet. Find a place where you can easily glance at it when you feel overwhelmed and close your eyes.</p> <p class="check-ins-content">Check in with it daily or as often as you want or not at all. I don't care do whatever you want.</p> <h2>Weekly</h2> <p class="check-ins-content">Each Saturday at 7pm send a text saying if goal was met and if not, why.</p> <h2>Monthly</h2> <p class="check-ins-content">On last day of the month have a call to talk about how things are going.</p> </div> </section> <section id="goals" class="nav-section"> <h1>This Week's Goals</h1> <form id="input-goal-form" method="POST"> <input id="input-goal" type="text" name="input-goal" placeholder="write your goal here" required> <button id="add-goal-button" type="submit">+</button> <img id="goalLine" src="goalLine.svg" alt="hand drawn line"> </form> <ul id="goals-section"> ${goalsDB.map(({ description, completed }) => renderTemplate`<li class="goal-item"> <img class="tikbox" src="tikbox.svg" alt="hand drawn tikbox"> <button class="complete-goal-button" type="button"${addAttribute(completed, "data-goal-complete")}></button> <div class="goal-text">${description}</div> <button id="delete-goal-button" class="delete-goal-button" type="button">x</button> </li>`)} </ul> </section> <section id="bunny-farm" class="nav-section"> <img id="farm" src="/farm.svg" alt="Line illustration of a farm."> <img id="sun" src="/sun.svg" alt="Line illustration of a sun."> <p id="counting-bunnies-msg"></p> <p id="dont-tap-farm-msg">Tap the farm on Saturday.</p> <p id="tap-farm-msg">Tap the farm !</p> <button id="dont-tap-farm-button">don't tap</button> <button id="tap-farm-button">tap here</button> <div id="bunny-pen"></div> <!-- <div id="bunny-count-msg">5</div> --> <div id="bunny-joke-bubble"></div> </section> <section id="main-menu" class="main-menu"> <nav id="main-navigation"> <button class="nav-button" data-menu="check-ins">check ins</button> <button class="nav-button" data-menu="goals">goals</button> <button class="nav-button" data-menu="bunny-farm">bunny farm</button> </nav> </section> <section id="splash-screen" class="splash-screen"> <h1 id="app-title">Ac<span class="text-accent">count</span>ability</h1> <h2 id="app-sub-title">Bunnies</h2> <img id="bunny-face" src="/bunnyface.svg" alt="line art of a bunny"> <button id="lets-go-button">let's go</button> </section> <button id="show-menu-button">menu</button> </main> ` })}   `;
}, "/workspaces/Accountability-Bunnies/src/pages/index.astro", void 0);

const $$file = "/workspaces/Accountability-Bunnies/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };

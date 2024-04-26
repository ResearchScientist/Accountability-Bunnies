import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent, m as maybeRenderHead } from '../astro_BwXg7fSy.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Annie+Use+Your+Telescope&family=Life+Savers:wght@400;700;800&family=Pavanam&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/workspaces/Accountability-Bunnies/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accountability Bunnies" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section id="check-ins" class="nav-section"> <h1>Check Ins</h1> <div id="check-ins-content-section"> <h2>Ideal Scenario</h2> <p class="check-ins-content">Imagine your ultimate goal. The location, the people, your role. Close your eyes and imagine the tastes and smells surrounding you. The temperature. The feeling of the air on your skin. And the feeling of the things you are touching. Imagine how you feel. Write it all down.</p> <p class="check-ins-content">Keep it somewhere where you can easily find it, like a note on your night stand, or hidden between your matresses, or pinned up inside your closet. Find a place where you can easily glance at it when you feel overwhelmed and close your eyes.</p> <p class="check-ins-content">Check in with it daily or as often as you want or not at all. I don't care do whatever you want.</p> <h2>Weekly</h2> <p class="check-ins-content">Each Saturday at 7pm send a text saying if goal was met and if not, why.</p> <h2>Monthly</h2> <p class="check-ins-content">On last day of the month have a call to talk about how things are going.</p> </div> </section> <section id="goals" class="nav-section"> <h1>This Week's Goals</h1> <form id="input-goal-form"> <input id="input-goal" type="text" name="goal" placeholder="write your goal here" required> <button id="add-goal-button" type="submit">+</button> <img id="goalLine" src="goalLine.svg" alt="hand drawn line"> </form> <ul id="goals-section"> <!-- <li class="goal-item">
                    <img class="tikbox" src="tikbox.svg" alt="hand drawn tikbox"/>
					<button id="complete-goal-button" class="complete-goal-button" type="button"></button>
                    <div class="goal-text">apply to crc positions</div>
                    <button id="delete-goal-button" class="delete-goal-button" type="button">x</button>
				</li>
                <li class="goal-item">
                    <img class="tikbox" src="tikbox.svg" alt="hand drawn tikbox"/>
                    <div class="goal-text">make more copies to send out</div>
                    <button id="delete-goal-button" class="delete-goal-button" type="button">x</button>
				</li> --> <!-- {
					goalsDB.map(({ description }) => (
						<li class="goal-item">
							<img class="tikbox" src="tikbox.svg" alt="hand drawn tikbox"/>
                    		<div class="goal-text">{description}</div>
                    		<button id="delete-goal-button">x</button>
						</li>
					))
				} --> </ul> </section> <section id="bunny-farm" class="nav-section"> <img id="farm" src="/farm.svg" alt="Line illustration of a farm."> <img id="sun" src="/sun.svg" alt="Line illustration of a sun."> <p id="counting-bunnies-msg"></p> <p id="dont-tap-farm-msg">Tap the farm on Saturday.</p> <p id="tap-farm-msg">Tap the farm !</p> <button id="dont-tap-farm-button">don't tap</button> <button id="tap-farm-button">tap here</button> <div id="bunny-pen"></div> </section> <section id="main-menu" class="main-menu"> <nav id="main-navigation"> <button class="nav-button" data-menu="check-ins">check ins</button> <button class="nav-button" data-menu="goals">goals</button> <button class="nav-button" data-menu="bunny-farm">bunny farm</button> </nav> </section> <section id="splash-screen" class="splash-screen"> <h1 id="app-title">Ac<span class="text-accent">count</span>ability</h1> <h2 id="app-sub-title">Bunnies</h2> <img id="bunny-face" src="/bunnyface.svg" alt="line art of a bunny"> <button id="lets-go-button">let's go</button> </section> <button id="show-menu-button">menu</button> </main> ` })}   `;
}, "/workspaces/Accountability-Bunnies/src/pages/index.astro", void 0);

const $$file = "/workspaces/Accountability-Bunnies/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };

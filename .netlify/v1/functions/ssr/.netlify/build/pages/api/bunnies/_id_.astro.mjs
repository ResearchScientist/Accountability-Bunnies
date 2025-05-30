import { d as db, B as Bunnies } from '../../../chunks/_astro_db_CvD9x3DU.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../renderers.mjs';

const PATCH = async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const { newTotalBunnies, updated } = await ctx.request.json();
    if (!id || id < 1 || !Number.isInteger(id)) {
      return new Response("invalid id", { status: 400 });
    }
    await db.update(Bunnies).set({ totalBunnies: newTotalBunnies, updated }).where(eq(Bunnies.id, id));
    return new Response("update successful", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

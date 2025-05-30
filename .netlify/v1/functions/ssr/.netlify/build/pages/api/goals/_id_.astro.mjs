import { d as db, G as Goals } from '../../../chunks/_astro_db_CvD9x3DU.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../renderers.mjs';

const DELETE = async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    if (!id || id < 1 || !Number.isInteger(id)) {
      return new Response("Error : invalid id", { status: 400 });
    }
    await db.delete(Goals).where(eq(Goals.id, id));
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
};
const PATCH = async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const { updatedCompleted } = await ctx.request.json();
    if (!id || id < 1 || !Number.isInteger(id)) {
      return new Response("Error : invalid id", { status: 400 });
    }
    if (typeof updatedCompleted !== "string") {
      return new Response("invalid completed value", { status: 400 });
    }
    await db.update(Goals).set({ completed: updatedCompleted }).where(eq(Goals.id, id));
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("somethings not right", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

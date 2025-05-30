import { d as db, G as Goals } from '../../../chunks/_astro_db_CvD9x3DU.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../../renderers.mjs';

const DELETE = async () => {
  try {
    await db.delete(Goals).where(eq(Goals.completed, "yes"));
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("an error happened", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

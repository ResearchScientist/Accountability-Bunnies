import { d as db, B as Bunnies } from '../../chunks/_astro_db_CvD9x3DU.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const allBunnies = await db.select().from(Bunnies);
    if (allBunnies.length === 0 || !("totalBunnies" in allBunnies[0])) {
      return new Response("No bunnies found", { status: 404 });
    }
    let totalBunniesValue = allBunnies[0].totalBunnies;
    return new Response(JSON.stringify(totalBunniesValue), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return new Response("Received an error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

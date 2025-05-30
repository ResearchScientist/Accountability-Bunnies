import { d as db, G as Goals } from '../../chunks/_astro_db_CvD9x3DU.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const allGoals = await db.select().from(Goals);
    return new Response(JSON.stringify(allGoals), {
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
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const newGoal = { ...data };
    const regex = /^(?! *$)[a-zA-Z0-9,. ]+$/;
    if (!regex.test(newGoal.description)) {
      return new Response("invalid description", { status: 400 });
    }
    await db.insert(Goals).values(newGoal);
    return new Response(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred.", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

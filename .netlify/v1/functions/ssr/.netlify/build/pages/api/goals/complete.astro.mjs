import { d as db, G as Goals } from '../../../chunks/_astro_db_CvD9x3DU.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const allGoals = await db.select().from(Goals);
    const completedGoals = allGoals.filter((goal) => goal.completed === "yes").length;
    const notcompletedGoals = allGoals.length - completedGoals;
    return new Response(
      JSON.stringify({ completedGoals, notcompletedGoals }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Got an error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

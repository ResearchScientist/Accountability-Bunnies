import { d as db, G as Goals } from './_id__jeLhpfDx.mjs';

const GET = async (ctx) => {
  try {
    const allGoals = await db.select().from(Goals);
    return new Response(JSON.stringify(allGoals), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const newGoal = { ...data, completed: false };
    await db.insert(Goals).values(newGoal);
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};

export { GET, POST };

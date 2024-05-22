import type { APIRoute } from 'astro';
import { db, Goals } from 'astro:db';

export const GET: APIRoute = async () => {
    try {
        const allGoals = await db.select().from(Goals);
        return new Response(JSON.stringify(allGoals), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    catch (error) {
        return new Response(`Error: ${error.message}`,{ status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
  try {
      const data = await request.json();
    //   const newGoal = { ...data, completed: "no" };
    const newGoal = { ...data};
      await db.insert(Goals).values(newGoal);
      return new Response(null, { status: 201 });
  }
  catch (error) {
      return new Response(`Error: ${error.message}`,{ status: 500 });
  }
};

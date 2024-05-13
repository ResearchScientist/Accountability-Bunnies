import type { APIRoute } from 'astro';
import { db, Goals } from 'astro:db';

export const GET: APIRoute = async (ctx) => {
    try {
      console.log('did it try to GET');
        const allGoals = await db.select().from(Goals);
        return new Response(JSON.stringify(allGoals), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    catch (error) {
      console.log(`error happened ${error.message}`);
        return new Response(`Error: ${error.message}`,{ status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('did it try to POST');
      const data = await request.json();
      const newGoal = { ...data, completed: false };
      await db.insert(Goals).values(newGoal);
      return new Response(null, { status: 201 });
  }
  catch (error) {
     console.log(`post error ${error.message}`);
      return new Response(`Error: ${error.message}`,{ status: 500 });
  }
};

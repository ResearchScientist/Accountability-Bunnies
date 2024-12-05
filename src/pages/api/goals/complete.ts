import type { APIRoute } from 'astro';
import { db, Goals } from 'astro:db';

export const GET: APIRoute = async () => {
    try {
        const allGoals = await db.select().from(Goals);
        const completedGoals =  allGoals.filter((goal: any) => goal.completed === 'yes').length;
        const notcompletedGoals = allGoals.length - completedGoals;
        return new Response(JSON.stringify({ completedGoals , notcompletedGoals }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    catch (error) {
        console.error(error);
        return new Response('Got an error',{ status: 500 });
    }
};
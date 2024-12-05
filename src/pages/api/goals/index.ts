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
        console.error(error);
        return new Response('Received an error',{ status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const newGoal = { ...data};
        const regex = /^(?! *$)[a-zA-Z0-9,. ]+$/;
        if (!regex.test(newGoal.description)) {
            return new Response('invalid description',{ status: 400 });
        }
        await db.insert(Goals).values(newGoal);
        return new Response(null,{ status: 201 });
    }
    catch (error) {
        console.error(error);
        return new Response('An error occurred.',{ status: 500 });
    }
};

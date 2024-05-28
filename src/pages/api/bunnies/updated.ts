import type { APIRoute } from 'astro';
import { db, Bunnies } from 'astro:db';

export const GET: APIRoute = async () => {
    try {
        const allBunnies = await db.select().from(Bunnies);
        let updatedValue = allBunnies[0].updated;
        return new Response(JSON.stringify(updatedValue), {
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
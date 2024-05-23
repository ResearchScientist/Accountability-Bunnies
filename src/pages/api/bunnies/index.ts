import type { APIRoute } from 'astro';
import { db, Bunnies } from 'astro:db';

export const GET: APIRoute = async () => {
    try {
        const allBunnies = await db.select().from(Bunnies);
        let totalBunniesValue = allBunnies[0].totalBunnies;
        return new Response(JSON.stringify(totalBunniesValue), {
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
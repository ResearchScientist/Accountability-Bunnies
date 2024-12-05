import type { APIRoute } from 'astro';
import { db, Bunnies } from 'astro:db';

export const GET: APIRoute = async () => {
    try {
        const allBunnies = await db.select().from(Bunnies);
        if (allBunnies.length === 0 || !('totalBunnies' in allBunnies[0])) {
            return new Response('No bunnies found',{ status: 404 });
        }
        let totalBunniesValue = allBunnies[0].totalBunnies;
        return new Response(JSON.stringify(totalBunniesValue), {
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
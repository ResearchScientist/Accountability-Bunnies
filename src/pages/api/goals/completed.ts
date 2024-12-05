import type { APIRoute } from 'astro';
import { db, Goals, eq } from 'astro:db';

export const DELETE: APIRoute = async () => {
    try {
        await db.delete(Goals).where(eq(Goals.completed,'yes'));
        return new Response(null,{ status: 204 });
    }
    catch (error) {
        console.error(error);
        return new Response('an error happened',{ status: 500 });
    }
};
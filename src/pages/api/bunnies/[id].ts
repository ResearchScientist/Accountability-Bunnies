import type { APIRoute } from 'astro';
import { db, Bunnies, eq } from 'astro:db';

export const PATCH: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        const { newTotalBunnies,updated } = await ctx.request.json();
        if (!id || id < 1 || !Number.isInteger(id)) {
            return new Response('invalid id',{ status: 400 });
        }
        await db.update(Bunnies).set({ totalBunnies: newTotalBunnies, updated }).where(eq(Bunnies.id,id));
        return new Response('update successful',{ status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response('An error occurred',{ status: 500 });
    }
}

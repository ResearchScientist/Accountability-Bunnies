import type { APIRoute } from 'astro';
import { db, Bunnies, eq } from 'astro:db';

export const PATCH: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        const { newTotalBunnies } = await ctx.request.json();
        if (!id) {
            return new Response('total id not foundl',{ status: 400 });
        }
        await db.update(Bunnies).set({ totalBunnies: newTotalBunnies, updated: newTotalBunnies }).where(eq(Bunnies.id,id));
        return new Response('update successful',{ status: 200 });
    }
    catch (error) {
        return new Response('something not right',{ status: 500 });
    }
}
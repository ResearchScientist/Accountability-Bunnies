import type { APIRoute } from 'astro';
import { db, Bunnies, eq } from 'astro:db';

export const POST: APIRoute = async ( ctx ) => {
    try {
        const id = Number(ctx.params.id);
        if (!id) {
            return new Response('total id not foundl',{ status: 400 });
        }
        let totalBunny = await db.select().from(Bunnies).where(eq(Bunnies.id,id));
        let totalBunnyValue = totalBunny[0].totalBunnies;
        await db.update(Bunnies).set({ totalBunnies: totalBunnyValue }).where(eq(Bunnies.id,id));
        return new Response('update successful',{ status: 200 });
    }
    catch (error) {
        return new Response('something not right',{ status: 500 });
    }
}
import type { APIRoute } from 'astro';
import { db, Bunnies, eq } from 'astro:db';

export const PATCH: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        const { newTotalBunnies,updated } = await ctx.request.json();
        if (!id) {
            return new Response('total id not foundl',{ status: 400 });
        }
        await db.update(Bunnies).set({ totalBunnies: newTotalBunnies, updated }).where(eq(Bunnies.id,id));
        return new Response('update successful',{ status: 200 });
    }
    catch (error) {
        return new Response('something not right',{ status: 500 });
    }
}

// export const PATCH: APIRoute = async (ctx) => {
//     try {
//         const id = Number(ctx.params.id);
//         const body = await ctx.request.json();
//         if (!id) {
//             return new Response('total id not foundl',{ status: 400 });
//         }
//         await db.update(Bunnies).set(body).where(eq(Bunnies.id,id));
//         return new Response('update successful',{ status: 200 });
//     }
//     catch (error) {
//         return new Response('something not right',{ status: 500 });
//     }
// }
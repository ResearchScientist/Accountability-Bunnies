import type { APIRoute } from 'astro';
import { db, Goals, eq } from 'astro:db';

export const DELETE: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        if (!id) {
            return new Response('Error : id is null',{ status: 400 });
        }
        await db.delete(Goals).where(eq(Goals.id,id));
        return new Response(null, { status: 204 });
    }
    catch (error) {
        return new Response(`Error: ${error.message}`,{status: 500});
    }
};

// export const PATCH: APIRoute = async (ctx) => {
//     const id = Number(ctx.params.id);
//     const goal = await db.select(Goals).where(eq(Goals.id,id));
//     const newCompletedValue = goal.completed === 'yes' ? 'no' : 'yes';
//     if (!id) {
//         return new Response('goal not found',{ status: 404 });
//     }
//     try {
//         // await db.update(Goals).set({ completed: 'yes' }).where(eq(Goals.id,id));
//         await db.update(Goals).set({ completed: newCompletedValue }).where(eq(Goals.id,id));
//     }
//     catch (error) {
//         return new Response('somethings not right',{ status: 500 });
//     }
//     return new Response('updated completed',{ status: 200 });
// };
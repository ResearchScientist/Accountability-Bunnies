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

export const PATCH: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        const { updatedCompleted } = await ctx.request.json();
        if (!id) {
            return new Response('goal id not foundl',{ status: 400 });
        }
        await db.update(Goals).set({ completed: updatedCompleted }).where(eq(Goals.id,id));
        console.log(id);
        console.log(updatedCompleted);
        return new Response(null, { status: 204 });
    }
    catch (error) {
        console.log('patch not routing');
        console.error('Error: ',error);
        return new Response('somethings not right',{ status: 500 });
    }
}

// export const PATCH: APIRoute = async (ctx) => {
//     try {
//         const id = Number(ctx.params.id);
//         if (!id) {
//             return new Response('goal id not foundl',{ status: 400 });
//         }
//         let goal = await db.select().from(Goals).where(eq(Goals.id,id));
//         let goalCompletedValue = goal[0].completed;
//         if (goalCompletedValue === 'no') {
//             await db.update(Goals).set({ completed: 'yes' }).where(eq(Goals.id,id));
//         }
//         else if (goalCompletedValue === 'yes') {
//             await db.update(Goals).set({ completed: 'no' }).where(eq(Goals.id,id));
//         }
//         else {
//             console.log('the goal completed value is something other than no or yes');
//         }
//         return new Response(null, { status: 204 });
//     }
//     catch (error) {
//         console.log('patch not routing');
//         return new Response('somethings not right',{ status: 500 });
//     }
// };
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
    // const goal = await db.select(Goals).where(eq(Goals.id,id));
//     const newCompletedValue = goal.completed === 'yes' ? 'no' : 'yes';
    try {
        console.log('trying patch route');
        const id = Number(ctx.params.id);
        // const goal = await db.select(Goals).where(eq(Goals.id,id));
        console.log('the patch id is',id);
        if (!id) {
            return new Response('goal id not foundl',{ status: 400 });
        }
        console.log('patching going on');
        console.log('completed status is',ctx.params.completed);
        return new Response(null, { status: 204 });
//         // await db.update(Goals).set({ completed: 'yes' }).where(eq(Goals.id,id));
//         await db.update(Goals).set({ completed: newCompletedValue }).where(eq(Goals.id,id));
    }
    catch (error) {
        console.log('patch not routing');
        return new Response('somethings not right',{ status: 500 });
    }
};
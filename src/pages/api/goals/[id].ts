import type { APIRoute } from 'astro';
import { db, Goals, eq , like} from 'astro:db';

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
        console.log('trying patch route');
        const id = Number(ctx.params.id);
        console.log('the patch id is',id);
        if (!id) {
            return new Response('goal id not foundl',{ status: 400 });
        }
        console.log('patching going on');
        await db.update(Goals).set({ completed: 'yes' }).where(eq(Goals.id,id));
        let goal = await db.select().from(Goals).where(eq(Goals.id,id));
        let goalCompletedValue = goal[0].completed;
        console.log(goalCompletedValue);
        // console.log(goal[0].completed);
        // const goal = await db.select(Goals).where(eq(Goals.id,id)).first();
        // const newCompletedValue = goal.completed === 'no' ? 'yes' : 'no';
        // await db.update(Goals).set({ completed: newCompletedValue }).where(eq(Goals.id,id));
        // console.log('complemeted status is',newCompletedValue);
        // console.log('completed status is',ctx.params.completed);
        // const bodyText = await ctx.request.body.text();
        // const body = JSON.parse(bodyText);
        // const completed = body.completed;
        // const formData = await ctx.request.formData();
        // const completed = formData.get('completed');
        // console.log('completed status is',completed);
        return new Response(null, { status: 204 });
    }
    catch (error) {
        console.log('patch not routing');
        return new Response('somethings not right',{ status: 500 });
    }
};
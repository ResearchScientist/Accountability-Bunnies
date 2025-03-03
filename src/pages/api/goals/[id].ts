import type { APIRoute } from 'astro';
import { db, Goals, eq } from 'astro:db';

export const DELETE: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        if (!id || id < 1 || !Number.isInteger(id)) {
            return new Response('Error : invalid id',{ status: 400 });
        }
        await db.delete(Goals).where(eq(Goals.id,id));
        return new Response(null, { status: 204 });
    }
    catch (error) {
        console.error(error);
        return new Response('An error occurred',{ status: 500 });
    }
};

export const PATCH: APIRoute = async (ctx) => {
    try {
        const id = Number(ctx.params.id);
        const { updatedCompleted } = await ctx.request.json();
        if (!id || id < 1 || !Number.isInteger(id)) {
            return new Response('Error : invalid id',{ status: 400 });
        }
        if (typeof updatedCompleted !== 'string') {
            return new Response('invalid completed value',{ status: 400 });
        }
        await db.update(Goals).set({ completed: updatedCompleted }).where(eq(Goals.id,id));
        return new Response(null, { status: 204 });
    }
    catch (error) {
        console.error(error);
        return new Response('somethings not right',{ status: 500 });
    }
}

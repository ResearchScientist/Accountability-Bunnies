// import type { APIRoute } from "astro";
// import { db, Goals, eq } from 'astro:db';

// export const DELETE: APIRoute = async (ctx) => {
//     await db.delete(Goals).where(eq(Goals.id, ctx.params.id));
//     return new Response(null, { status: 204 });
// }
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const Goals = asDrizzleTable("Goals", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Goals", "primaryKey": true } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Goals", "primaryKey": false, "optional": false } }, "completed": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "completed", "collection": "Goals", "default": "no", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Bunnies = asDrizzleTable("Bunnies", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Bunnies", "primaryKey": true } }, "totalBunnies": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "totalBunnies", "collection": "Bunnies", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const DELETE = async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    if (!id) {
      return new Response("Error : id is null", { status: 400 });
    }
    await db.delete(Goals).where(eq(Goals.id, id));
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE
}, Symbol.toStringTag, { value: 'Module' }));

export { Bunnies as B, Goals as G, _id_ as _, db as d };

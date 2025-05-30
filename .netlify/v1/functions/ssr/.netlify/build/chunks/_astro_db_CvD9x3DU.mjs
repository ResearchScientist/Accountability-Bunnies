import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient({
  dbType: "libsql",
  remoteUrl: "libsql://bunnies-db-researchscientist.aws-us-west-1.turso.io",
  appToken: process.env.ASTRO_DB_APP_TOKEN
});
const Goals = asDrizzleTable("Goals", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Goals", "primaryKey": true } }, "description": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "description", "collection": "Goals", "primaryKey": false, "optional": false } }, "completed": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "completed", "collection": "Goals", "default": "no", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);
const Bunnies = asDrizzleTable("Bunnies", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Bunnies", "primaryKey": true } }, "totalBunnies": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "totalBunnies", "collection": "Bunnies", "primaryKey": false, "optional": false } }, "updated": { "type": "boolean", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "updated", "collection": "Bunnies", "default": false } } }, "deprecated": false, "indexes": {} }, false);

export { Bunnies as B, Goals as G, db as d };

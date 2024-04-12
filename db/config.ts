import { defineDb, defineTable, column } from 'astro:db';

// Resources //
// https://docs.astro.build/en/guides/astro-db/
// https://docs.astro.build/en/guides/integrations-guide/db/

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true}),
    username: column.text({ optional: false, unique: true }),
  }
});

const Goals = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        description: column.text({ optional: false }),
        completed: column.boolean({ default: false }),
        // user: column.number({ references: () => Users.columns.id }),
    }
});

export default defineDb({
  tables: { Goals }
//   tables: { Users, Goals }
});

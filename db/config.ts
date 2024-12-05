import { defineDb, defineTable, column } from 'astro:db';
// import { defineDb, defineTable, column, FALSE } from 'astro:db';

// const Users = defineTable({
//   columns: {
//     id: column.number({ primaryKey: true}),
//     username: column.text({ optional: false, unique: true }),
//   }
// });

const Goals = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        description: column.text({ optional: false }),
        completed: column.text({ optional: false , default: 'no' }),
        // user: column.number({ references: () => Users.columns.id }),
    }
});

const Bunnies = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        totalBunnies: column.number(),
        updated: column.boolean({ default: false }),
        // user: column.number({ references: () => Users.columns.id }),
    }
});

export default defineDb({
  tables: { Goals, Bunnies }
});

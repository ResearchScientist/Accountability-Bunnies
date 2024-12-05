import { db, Goals, Bunnies } from 'astro:db';

export default async function() {
    await db.insert(Goals).values([
        {
            id: 1,
            description: 'bake a cookie',
            completed: 'no',
        },
        {
            id: 2,
            description: 'hug a bear',
            completed: 'yes',
        },
        {
            id: 3,
            description: 'count bunnies',
            completed: 'no',
        }
    ]),
    await db.insert(Bunnies).values([
        {
            id: 1,
            updated: false,
            totalBunnies: 5,
        }
    ])
}

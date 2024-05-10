import { db, Goals, Bunnies } from 'astro:db';

export default async function() {
    await db.insert(Goals).values([
        {
            id: 1,
            description: 'bake a cookie',
            completed: 'yes',
        },
        {
            id: 2,
            description: 'hug a bear',
            completed: 'no',
        },
        {
            id: 3,
            description: 'count bunnies',
            completed: 'yes',
        }
    ]),
    await db.insert(Bunnies).values([
        {
            id: 10,
            totalBunnies: 5,
        }
    ])
}

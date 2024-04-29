import { db, Goals } from 'astro:db';

export default async function() {
    await db.insert(Goals).values([
        {
            id: 1,
            description: 'eat a cookie',
            completed: true,
        },
        {
            id: 2,
            description: 'hug a bear',
            completed: false,
        }
    ])
}

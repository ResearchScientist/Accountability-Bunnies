import { db, Goals } from 'astro:db';

// Resources
// https://astro.build/db/seed


export default async function seed() {
    await db.insert(Goals).values([
        {
            id: 1,
            description: 'eat a cookie',
            completed: true
        },
        {
            id: 2,
            description: 'hug a bear',
            completed: false
        },
    ])
}

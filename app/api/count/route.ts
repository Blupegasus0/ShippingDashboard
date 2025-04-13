import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log }); // Optional: log SQL queries

export async function GET(req) {
    try {
        const row = db.prepare('SELECT COUNT(*) AS count FROM shipments').get();
        return new Response(JSON.stringify({ count: row.count }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch shipment count' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log });

export async function GET(req) {
    try {
        const volumeByMode = db.prepare(`
            SELECT mode, COUNT(*) AS volume 
            FROM shipments 
            GROUP BY mode
        `).all();


        return new Response(JSON.stringify({ volumeByMode }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch pie chart data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

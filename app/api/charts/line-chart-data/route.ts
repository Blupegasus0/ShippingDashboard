import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log });

export async function GET(req) {
    try {
        const data = db.prepare(`
            SELECT DATE(arrival_date) AS date, COUNT(*) AS count 
            FROM shipments 
            GROUP BY DATE(arrival_date)
            ORDER BY DATE(arrival_date)
        `).all();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch line chart data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

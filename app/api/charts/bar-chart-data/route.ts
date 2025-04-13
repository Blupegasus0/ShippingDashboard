import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log }); // Update with your database path

export async function GET(req) {
    try {
        const data = db.prepare(`
            SELECT DATE(arrival_date) AS date, carrier, COUNT(*) AS count 
            FROM shipments 
            WHERE status = 'received'
            GROUP BY DATE(arrival_date), carrier
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
        return new Response(JSON.stringify({ error: 'Failed to fetch bar chart data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

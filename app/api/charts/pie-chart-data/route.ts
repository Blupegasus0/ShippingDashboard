import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log });

export async function GET(req) {
    try {
        const volumeByMode = db.prepare(`
            SELECT mode, COUNT(*) AS volume 
            FROM shipments 
            GROUP BY mode
        `).all();

        const totalCapacity = 10000; // Replace with your actual warehouse capacity
        const currentVolume = db.prepare(`
            SELECT SUM(volume) AS currentVolume 
            FROM shipments
        `).get().currentVolume || 0;

        const utilizationRate = (currentVolume / totalCapacity) * 100;

        return new Response(JSON.stringify({ volumeByMode, utilizationRate }), {
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

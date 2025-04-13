import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log }); // Optional: log SQL queries

export async function GET(req) {
    try {
        const totalPackages = db.prepare(`
            SELECT COUNT(*) AS totalPackages FROM shipments
        `).get().totalPackages || 0;

        const totalCapacity = 60_000_000_000; 
        const currentVolume = db.prepare(`
            SELECT SUM(volume) AS currentVolume 
            FROM shipments
            WHERE status = 'received'
        `).get().currentVolume || 0;

        const utilizationRate = (currentVolume / totalCapacity) * 100;

        const latePackages = db.prepare(`
            SELECT COUNT(*) AS packages_arrived_more_than_6_days_ago
            FROM shipments
            WHERE arrival_date < DATE('now', '-6 days')`
        ).get().latePackages || 0;

        const packagesOnTime = ((totalPackages - latePackages) / totalPackages) * 100;

        return new Response(JSON.stringify({ totalPackages, utilizationRate, packagesOnTime }), {
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

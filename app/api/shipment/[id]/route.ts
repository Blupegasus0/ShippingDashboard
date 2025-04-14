
import Database from 'better-sqlite3';
import { NextRequest } from 'next/server';

const db = new Database('db.sqlite');

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipmentId = Number(params.id);

    if (isNaN(shipmentId)) {
      return new Response(JSON.stringify({ error: 'Invalid shipment ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const shipment = db.prepare(`
      SELECT * FROM shipments WHERE shipment_id = ?
    `).get(shipmentId);

    if (!shipment) {
      return new Response(JSON.stringify({ error: 'Shipment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(shipment), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve shipment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

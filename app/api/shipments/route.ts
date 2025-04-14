import Database from 'better-sqlite3';
import { NextRequest } from 'next/server';

const db = new Database('db.sqlite');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const carrier = searchParams.get('carrier')?.toLowerCase() || '';
    const destination = searchParams.get('destination')?.toLowerCase() || '';
    const status = searchParams.get('status')?.toLowerCase() || '';

    let query = `SELECT shipment_id, carrier, destination, status, volume, arrival_date FROM shipments`;
    const conditions: string[] = [];
    const params: Record<string, any> = {};

    if (carrier) {
      conditions.push(`LOWER(carrier) LIKE @carrier`);
      params.carrier = `%${carrier}%`;
    }
    if (destination) {
      conditions.push(`LOWER(destination) LIKE @destination`);
      params.destination = `%${destination}%`;
    }
    if (status) {
      conditions.push(`LOWER(status) LIKE @status`);
      params.status = `%${status}%`;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const shipments = db.prepare(query).all(params);

    return new Response(JSON.stringify({ shipments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch shipments' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

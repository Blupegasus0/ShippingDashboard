import Database from 'better-sqlite3';
import path from 'path';

// Create a new SQLite database
const db = new Database(path.join(process.cwd(), 'db.sqlite'));

// Create the shipments table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS shipments (
    shipment_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    origin TEXT,
    destination TEXT,
    weight INTEGER,
    volume INTEGER,
    carrier TEXT,
    mode TEXT,
    status TEXT,
    arrival_date TEXT,
    departure_date TEXT,
    delivered_date TEXT
  )
`);

export default db;

import fs from 'fs';
import path from 'path';
import db from './db/init';
import csv from 'csv-parser';

// Disable Next.js's default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file'); // Assuming the input name is 'file'

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  // Define the upload directory
  const uploadDir = path.join(process.cwd(), 'uploads');

  // Ensure the upload directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  // Create a path for the new file
  const filePath = path.join(uploadDir, file.name);

  // Read the file as a buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the buffer to the file system
  fs.writeFileSync(filePath, buffer);

  // Parse the CSV file and insert data into SQLite
  const results = [];
  const insert = db.prepare(`
    INSERT OR IGNORE INTO shipments (shipment_id, customer_id, origin, destination, weight, volume, carrier, mode, status, arrival_date, departure_date, delivered_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Start a transaction
  const transaction = db.transaction(() => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          // Collect rows in batches
          results.push([
            data.shipment_id,
            data.customer_id,
            data.origin,
            data.destination,
            data.weight,
            data.volume,
            data.carrier,
            data.mode,
            data.status,
            data.arrival_date,
            data.departure_date,
            data.delivered_date,
          ]);

          // Insert in batches of 1000
          let count = 1;
          if (results.length >= 1000) {
            console.log(`Processing batch ${count} - inserting into database...`);
            count += 1;
            for (const row of results) {
              insert.run(...row); // Insert each row individually
            }
            results.length = 0; // Clear the array
          }
        })
        .on('end', () => {
          // Insert any remaining rows
          if (results.length > 0) {
            for (const row of results) {
              insert.run(...row); // Insert each row individually
            }
            console.log("Data inserted successfully.");
          }
          resolve(); // Resolve the promise when done
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(new Response('Error processing file', { status: 500 })); // Reject with an error response
        });
    });
  });

  try {
    await transaction(); // Execute the transaction
    return new Response(JSON.stringify({ message: 'File uploaded and data inserted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Transaction error:', error);
    return new Response('Error processing file', { status: 500 }); // Return error response
  }
}

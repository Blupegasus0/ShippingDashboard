import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

// Promisify exec for easier use with async/await
const execPromise = util.promisify(exec);

// Define the upload directory
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file'); // Assuming the input name is 'file'

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  // Create a path for the new file
  const filePath = path.join(uploadDir, file.name);

  // Read the file as a buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the buffer to the file system
  fs.writeFileSync(filePath, buffer);

  // Path to the Rust executable
  const rustExecutable = path.join(process.cwd(), 'bin', 'csv_to_sqlite');

  try {
    // Execute the Rust program with the CSV file path as an argument
    const { stdout, stderr } = await execPromise(`${rustExecutable} ${filePath}`);
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
      return new Response('Error processing file', { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'File uploaded and data inserted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error executing Rust program:', error);
    return new Response('Error processing file', { status: 500 });
  }
}

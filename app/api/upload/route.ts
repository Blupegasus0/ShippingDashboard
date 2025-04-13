import fs from 'fs';
import path from 'path';

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

  return new Response(JSON.stringify({ message: 'File uploaded successfully' }), { status: 200 });
}

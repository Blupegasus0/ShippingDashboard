export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  const data = await request.json(); // Access the request body
  return new Response(JSON.stringify({ message: 'Data received', data }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET() {
    return new Response(
    JSON.stringify({msg: 'hiya'}), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
export async function GET(request: Request) {
    return new Response('test 200OK let\'s gooo', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
    });
}
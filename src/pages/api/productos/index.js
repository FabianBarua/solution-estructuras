export const GET = async ({ params, request }) => {
  return new Response(JSON.stringify([
    'Buy the milk',
    'Write a blog post'
  ]))
}

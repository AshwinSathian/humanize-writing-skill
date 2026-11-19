import type { APIRoute } from 'astro'
import { card, cardNames } from '../../lib/og'

export const getStaticPaths = () => cardNames.map((name) => ({ params: { name } }))

export const GET: APIRoute = async ({ params }) =>
  new Response(new Uint8Array(await card(params.name!)), { headers: { 'Content-Type': 'image/png' } })

import type { APIRoute } from 'astro'
import { card } from '../lib/og'

// The address the Next.js site published its card at; link previews that cached it keep working.
export const GET: APIRoute = async () => new Response(new Uint8Array(await card('site')), { headers: { 'Content-Type': 'image/png' } })

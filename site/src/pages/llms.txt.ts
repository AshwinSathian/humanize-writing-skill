import { llmsTxt } from '../lib/llms'

export const GET = () => new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

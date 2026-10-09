import { llmsTxt } from '@/lib/llms'

export const dynamic = 'force-static'

export const GET = () => new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

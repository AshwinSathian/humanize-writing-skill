import { llmsFullTxt } from '@/lib/llms'

export const dynamic = 'force-static'

export const GET = () => new Response(llmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

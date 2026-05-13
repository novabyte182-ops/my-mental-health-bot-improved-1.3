import { generateReply } from '@/lib/ai'

const history = []

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text?.trim()) return Response.json({ error: 'No message' }, { status: 400 })

    const result = await generateReply(text, history.slice(-10))
    
    history.push({ user: text.slice(0, 500), bot: result.reply.slice(0, 1000), emotion: result.emotion, source: result.source, time: Date.now() })
    if (history.length > 100) history.splice(0, history.length - 100)

    return Response.json(result)
  } catch {
    return Response.json({ reply: "I'm here to listen. Tell me more.", emotion: 'neutral', source: 'fallback' })
  }
}

export async function GET() {
  return Response.json({ recent: history.slice(-20).reverse() })
}

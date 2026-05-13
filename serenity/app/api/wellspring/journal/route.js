import { getDailyPrompt } from '@/lib/ai'

const entries = []

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text?.trim()) return Response.json({ error: 'No text' }, { status: 400 })
    entries.push({
      id: Math.random().toString(36).slice(2, 8),
      text: text.slice(0, 2000),
      date: new Date().toISOString().slice(0, 10),
      timestamp: Date.now()
    })
    if (entries.length > 500) entries.splice(0, entries.length - 500)
    return Response.json({ saved: true })
  } catch { return Response.json({ error: 'Invalid' }, { status: 400 }) }
}

export async function GET() {
  return Response.json({
    entries: entries.slice(-20).reverse(),
    dailyPrompt: getDailyPrompt()
  })
}

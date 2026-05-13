import { MOOD_LEVELS } from '@/lib/ai'

const moods = []

export async function POST(req) {
  try {
    const { mood, note } = await req.json()
    const m = MOOD_LEVELS.find(m => m.key === mood) || MOOD_LEVELS[2]
    moods.push({ ...m, note: (note || '').slice(0, 500), date: new Date().toISOString().slice(0, 10), timestamp: Date.now() })
    if (moods.length > 365) moods.splice(0, moods.length - 365)
    return Response.json({ saved: true, message: `${m.emoji} ${m.label}`, mood: m.key })
  } catch {
    return Response.json({ error: 'Invalid' }, { status: 400 })
  }
}

export async function GET() {
  const h = moods.slice(-14)
  const avg = h.length > 0 ? Math.round((h.reduce((a, m) => a + m.value, 0) / h.length) * 10) / 10 : 0
  return Response.json({
    history: h,
    stats: { count: h.length, average: avg, trend: h.length > 0 ? (h.slice(-7).reduce((a, m) => a + m.value, 0) / Math.min(h.slice(-7).length, 1) > avg ? 'improving' : 'stable') : 'neutral' }
  })
}

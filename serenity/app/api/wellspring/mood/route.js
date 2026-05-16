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
  const recent = h.slice(-7)
  const recentAvg = recent.length > 0 ? recent.reduce((a, m) => a + m.value, 0) / recent.length : 0
  let trend = 'neutral'
  if (h.length >= 7) {
    if (recentAvg > avg + 0.3) trend = 'improving'
    else if (recentAvg < avg - 0.3) trend = 'declining'
    else trend = 'stable'
  }
  return Response.json({
    history: h,
    stats: { count: h.length, average: avg, trend }
  })
}

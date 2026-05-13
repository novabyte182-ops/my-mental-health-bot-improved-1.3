import { BREATHING_EXERCISES, GROUNDING_TECHNIQUES, getDailyPrompt } from '@/lib/ai'

export async function GET() {
  return Response.json({
    breathing: Object.entries(BREATHING_EXERCISES).map(([id, e]) => ({ id, icon: e.icon, name: e.name, desc: e.desc, color: e.color })),
    grounding: Object.entries(GROUNDING_TECHNIQUES).map(([id, e]) => ({ id, icon: e.icon, name: e.name, desc: e.desc })),
    breathingDetails: BREATHING_EXERCISES,
    groundingDetails: GROUNDING_TECHNIQUES,
    dailyPrompt: getDailyPrompt()
  })
}

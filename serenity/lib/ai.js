/* ═══ EMOTIONAL INTELLIGENCE ENGINE ═══════════════════════════ */
const EMOTIONS = {
  sad: {
    keywords: ['sad','cry','crying','tears','upset','hurt','pain','grief','depressed','down','miserable','heartbroken','sorrow'],
    responses: [
      "I hear you. It's okay to feel sad — it means you care deeply. I'm right here with you.",
      "That sounds really heavy. Thank you for trusting me with how you feel. Take your time.",
      "Sadness has its own quiet wisdom. Let's sit with it together for a moment.",
      "I'm holding space for you. You don't have to be strong right now. Just be.",
      "Tears are not weakness — they're the heart speaking a language words can't reach."
    ],
    color: '#74b9ff', icon: '🌧️'
  },
  anxious: {
    keywords: ['anxious','worry','nervous','panic','fear','dread','scared','afraid','uneasy','tense','overthinking','restless'],
    responses: [
      "I can feel how much is stirring inside you. Let's take a slow breath together.",
      "Anxiety can feel like a storm inside. But storms pass. You are the sky, not the weather.",
      "It's okay to feel unsettled. Your mind is trying to protect you — thank it, then breathe.",
      "Let's ground ourselves. Feel your feet on the floor. You are here. You are safe.",
      "When worry gets loud, try naming one thing you can see, one thing you can hear."
    ],
    color: '#ffeaa7', icon: '💫'
  },
  angry: {
    keywords: ['angry','frustrat','annoy','mad','irritat','rage','furious','frustrated'],
    responses: [
      "Anger is valid. It's a sign something matters deeply to you. I'm here to listen.",
      "I hear your frustration. You don't have to process this alone.",
      "It takes strength to express anger. Beneath it often lies hurt or fear. Let's explore gently.",
      "Your feelings make sense. Tell me more — I'm listening without judgment."
    ],
    color: '#fab1a0', icon: '🔥'
  },
  stressed: {
    keywords: ['stress','overwhelm','pressure','busy','deadline','swamped','burnout','exhaust','overloaded','stressed'],
    responses: [
      "You're carrying so much right now. Let's take a moment to just breathe together.",
      "Stress is your body telling you something matters. But you don't have to carry it alone.",
      "You've been doing your best with what you have. That is always, always enough.",
      "Let's pause. Inhale slowly... and exhale. You don't have to solve everything right now.",
      "What would feel like one small, kind thing you could do for yourself right now?"
    ],
    color: '#81ecec', icon: '😮‍💨'
  },
  lonely: {
    keywords: ['lonely','alone','isolat','no one','nobody','abandon','forgotten','disconnected'],
    responses: [
      "Loneliness is one of the hardest human experiences. Please know that you matter.",
      "I'm here with you. Sometimes just being heard can make a real difference.",
      "It's brave to admit you're feeling lonely. Connection starts with reaching out — and you just did.",
      "You are worthy of connection, even when it doesn't feel that way. I'm glad you're here."
    ],
    color: '#a29bfe', icon: '🌙'
  },
  tired: {
    keywords: ['tired','exhaust','drain','fatigue','sleep','rest','burnout','worn','depleted'],
    responses: [
      "Rest isn't a reward — it's a necessity. You've been giving so much. Be gentle with yourself.",
      "Your worth isn't measured by your productivity. You are enough, even in stillness.",
      "Sometimes the most healing thing you can do is pause. I give you permission to rest.",
      "You've been running on empty. Let yourself replenish. Even a few minutes helps."
    ],
    color: '#636e72', icon: '😴'
  },
  hopeless: {
    keywords: ['hopeless','despair','give up','worthless','empty','numb',"can't go on",'pointless'],
    responses: [
      "I'm really glad you're here sharing this with me. These feelings are real but they are not permanent. You've survived 100% of your hardest days so far.",
      "Right now things may feel dark. But you don't have to find the light alone. Please reach out to someone who is trained to help.",
      "What you're feeling matters. You matter. There is support available — please talk to someone who can provide the care you deserve."
    ],
    color: '#e17055', icon: '🤍'
  },
  happy: {
    keywords: ['happy','great','wonderful','amazing','blessed','joy','grateful','excited','beautiful'],
    responses: [
      "That's beautiful! Joy is meant to be shared — thank you for including me in your light.",
      "I love that for you! What's helping you feel this way? Let's savor this moment together.",
      "Gratitude and joy are powerful forces. Hold onto this feeling — you deserve it.",
      "This warmth you're feeling? That's real. Let it fill you up. You deserve good things."
    ],
    color: '#55efc4', icon: '☀️'
  },
  neutral: {
    keywords: [],
    responses: [
      "Thank you for being here. I'm listening — tell me what's on your mind, at your own pace.",
      "I'm glad you're here. There's no pressure to have it all figured out. Share what feels right.",
      "Take your time. I'm not going anywhere. Whatever you want to share, I'm here for it.",
      "Sometimes just having someone listen makes all the difference. I'm that someone for you."
    ],
    color: '#dfe6e9', icon: '💭'
  }
}

/* ═══ CRISIS SAFETY ═════════════════════════════════════════ */
const CRISIS_KEYWORDS = [
  'kill myself','end my life','want to die','better off dead',
  'suicide','self-harm','hurt myself','cutting',
  "don't want to live","can't do this anymore",'no reason to live',
  'ending it all','take my own life','suicidal'
]

const CRISIS_RESPONSE = `I'm really glad you reached out. What you're feeling is real — but you don't have to face it alone.

**988 Suicide & Crisis Lifeline** — Call or text 988 (US)
**Crisis Text Line** — Text HOME to 741741
**Call 911** or go to your nearest emergency room

You are not alone. There is support available. Please reach out.`

/* ═══ DETECTION ═════════════════════════════════════════════ */
export function detectEmotion(text) {
  const lower = text.toLowerCase()
  const scores = {}
  for (const [emotion, data] of Object.entries(EMOTIONS)) {
    let s = 0
    for (const kw of data.keywords) {
      try { if (new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i').test(lower)) s++ }
      catch {}
    }
    if (s > 0) scores[emotion] = s
  }
  return Object.keys(scores).length > 0
    ? Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
    : 'neutral'
}

export function isCrisis(text) {
  return CRISIS_KEYWORDS.some(kw => text.toLowerCase().includes(kw))
}

/* ═══ OLLAMA AI (Local) ═══════════════════════════════════ */
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral:7b'

export async function queryOllama(messages) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: 'You are Serenity, a calm, warm AI wellness companion. Respond with emotional support and kindness in 1-3 sentences. Never claim to be a therapist. If someone is in crisis, encourage professional help.' },
          ...messages.slice(-6)
        ],
        stream: false,
        options: { temperature: 0.7, num_predict: 200 }
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.message?.content || null
  } catch { return null }
}

export async function checkOllama() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`)
    if (!res.ok) return { available: false, models: [] }
    const data = await res.json()
    return { available: true, models: (data.models || []).map(m => m.name) }
  } catch { return { available: false, models: [] } }
}

/* ═══ RESPONSE GENERATION ════════════════════════════════ */
export async function generateReply(text, history = []) {
  // 1. Crisis check
  if (isCrisis(text)) return { reply: CRISIS_RESPONSE, emotion: 'crisis', source: 'safety' }

  const emotion = detectEmotion(text)

  // 2. Try Ollama (local AI)
  try {
    const ollamaMsg = history.slice(-4).flatMap(m => [
      { role: 'user', content: m.user || '' },
      { role: 'assistant', content: m.bot || '' }
    ])
    ollamaMsg.push({ role: 'user', content: text })
    const ollamaReply = await queryOllama(ollamaMsg)
    if (ollamaReply && ollamaReply.length > 5) {
      return { reply: ollamaReply, emotion, source: 'ollama' }
    }
  } catch {}

  // 3. Template fallback (always works)
  const replies = EMOTIONS[emotion]?.responses || EMOTIONS.neutral.responses
  const reply = replies[Math.floor(Math.random() * replies.length)]
  return { reply, emotion, source: 'template' }
}

/* ═══ WELLNESS DATA ═══════════════════════════════════════ */
export const BREATHING_EXERCISES = {
  box_breathing: {
    name: 'Box Breathing', icon: '⊞', color: '#6c5ce7',
    desc: 'Inhale 4, hold 4, exhale 4, hold 4. Used by Navy SEALs.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Breathe in slowly...' },
      { action: 'hold', count: 4, text: 'Hold...' },
      { action: 'breathe out', count: 4, text: 'Breathe out slowly...' },
      { action: 'hold', count: 4, text: 'Hold...' },
    ]
  },
  relaxing_breath: {
    name: '4-7-8 Breathing', icon: '🌊', color: '#00cec9',
    desc: 'Inhale 4, hold 7, exhale 8. A natural tranquilizer.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Breathe in through your nose...' },
      { action: 'hold', count: 7, text: 'Hold your breath...' },
      { action: 'breathe out', count: 8, text: 'Exhale slowly...' },
    ]
  },
  deep_belly: {
    name: 'Deep Belly Breathing', icon: '🫁', color: '#a29bfe',
    desc: 'Place a hand on your belly and feel it rise and fall.',
    pattern: [
      { action: 'breathe in', count: 5, text: 'Let your belly fill with air...' },
      { action: 'breathe out', count: 5, text: 'Slowly release...' },
    ]
  },
  calming_overflow: {
    name: 'Calming Overflow', icon: '🍃', color: '#55efc4',
    desc: 'Longer exhalation to activate the parasympathetic nervous system.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Softly breathe in...' },
      { action: 'breathe out', count: 8, text: 'Gently let go...' },
    ]
  }
}

export const GROUNDING_TECHNIQUES = {
  '5_4_3_2_1': {
    name: '5-4-3-2-1 Grounding', icon: '🌿',
    desc: 'Notice 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
    steps: ['Look around and name 5 things you can SEE','Notice 4 things you can TOUCH','Name 3 things you can HEAR','Notice 2 things you can SMELL','Name 1 thing you can TASTE']
  },
  body_scan: {
    name: 'Quick Body Scan', icon: '🧘',
    desc: 'Release tension held in your body.',
    steps: ['Bring attention to your feet','Relax your legs and belly','Soften your chest and shoulders','Relax your jaw and eyes','Take a deep breath']
  }
}

export const MOOD_LEVELS = [
  { key: 'terrible', emoji: '😞', color: '#e17055', value: 1, label: 'Terrible' },
  { key: 'sad', emoji: '😢', color: '#74b9ff', value: 2, label: 'Sad' },
  { key: 'okay', emoji: '😐', color: '#dfe6e9', value: 3, label: 'Okay' },
  { key: 'good', emoji: '🙂', color: '#55efc4', value: 4, label: 'Good' },
  { key: 'great', emoji: '😊', color: '#fdcb6e', value: 5, label: 'Great' },
]

export const JOURNAL_PROMPTS = [
  "What are 3 things you're grateful for today?",
  "What emotion was most present for you today?",
  "Describe a moment of peace you experienced recently.",
  "What's something you're proud of yourself for?",
  "What would your inner child want you to know?",
  "What helps you feel safe and grounded?",
  "What's a limiting belief you're ready to let go of?",
  "If calmness was a color, what would it look like right now?",
]

export function getDailyPrompt() {
  const seed = new Date().toISOString().slice(0, 10)
  const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return JOURNAL_PROMPTS[hash % JOURNAL_PROMPTS.length]
}

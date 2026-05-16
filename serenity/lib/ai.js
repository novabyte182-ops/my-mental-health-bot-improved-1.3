/* ═══ THERAPEUTIC INTELLIGENCE ENGINE ═══════════════════════════ */
/* Using evidence-based techniques: CBT, DBT, ACT, MI, SFBT     */

const EMOTIONS = {
  sad: {
    keywords: ['sad','cry','crying','tears','upset','hurt','pain','grief','depressed','down','miserable','heartbroken','sorrow','mourn','melancholy','heavy','low'],
    responses: [
      "I hear the weight in your words. Sadness like this often comes from a place of deep caring. Can you tell me what feels heaviest right now?",
      "That sounds really painful. I want you to know that your feelings make sense — grief and sadness are natural responses to loss or disappointment. What kind of support would feel most helpful in this moment?",
      "Thank you for trusting me with this. Sometimes sadness needs space to just be felt without needing to be 'fixed.' I'm here with you in it.",
      "It takes courage to share when you're feeling low. What's one small thing that brought you even a flicker of comfort recently?",
      "Sadness has a way of slowing us down, and maybe that's its own kind of wisdom. If your sadness could speak, what might it be trying to tell you?",
      "I'm holding space for you right now. There's nothing you need to do or say. Sometimes being fully present with our feelings is the most healing thing."
    ],
    color: '#74b9ff', icon: '🌧️'
  },
  anxious: {
    keywords: ['anxious','worry','nervous','panic','fear','dread','scared','afraid','uneasy','tense','overthinking','restless','racing','on edge','spiral','catastrophize','anxiety'],
    responses: [
      "I can feel how much is stirring inside you. Let's try something: take a slow breath in for 4 counts, hold for 4, and out for 6. Anxiety lives in the future — let's gently bring you back to right now. What do you notice around you?",
      "Anxiety can feel overwhelming, but it's also your mind's way of trying to protect you. Let's gently examine that thought — what's the story your anxiety is telling you right now?",
      "When the mind races, it helps to name what's happening: 'This is anxiety. It's uncomfortable, but it's not dangerous.' What would it feel like to just observe your thoughts passing by, like clouds?",
      "Let's ground together. Name 3 things you can see, 2 things you can hear, and 1 thing you can feel. You are here. You are safe. I'm right here with you.",
      "Anxiety often comes from uncertainty. What's one small thing you *do* know to be true right now, even if everything else feels unstable?",
      "I hear the worry. If we could turn down the volume on that anxious voice just a little, what would the quieter, calmer part of you want to say?"
    ],
    color: '#ffeaa7', icon: '💫'
  },
  angry: {
    keywords: ['angry','frustrat','annoy','mad','irritat','rage','furious','frustrated','pissed','resent','bitter','rage'],
    responses: [
      "Anger is a signal that a boundary has been crossed or something deeply matters to you. Let's explore that — what's the need or value underneath the anger?",
      "I hear your frustration. Anger gets a bad reputation, but it's often a protector. Can you describe what it feels like in your body right now?",
      "That sounds incredibly frustrating. Before we problem-solve, let's make space for the anger itself. What would it say if it could speak freely?",
      "Anger is valid. Sometimes we need to release it before we can understand it. What helps you safely express anger — movement, writing, or something else?",
      "I hear you. Beneath anger there's often hurt, fear, or a sense of injustice. Which of those resonates most with what's going on?"
    ],
    color: '#fab1a0', icon: '🔥'
  },
  stressed: {
    keywords: ['stress','overwhelm','pressure','busy','deadline','swamped','burnout','exhaust','overloaded','stressed','drowning','can\'t keep up','stretched','spread thin'],
    responses: [
      "You're carrying so much right now. Let's pause and take just one breath together. What's the single most important thing you need right now — rest, support, or simply permission to step back?",
      "Stress signals that the demands on you are exceeding your resources. That's not a personal failing — it's a signal. What's one thing you could set down, even temporarily?",
      "You've been doing your best with what you have, and that is genuinely enough. If you gave yourself permission to do less today, what might you let go of?",
      "When we're overwhelmed, even small decisions feel heavy. Let's break this down: what's the single next step, no matter how tiny, that would feel manageable?",
      "Burnout happens when we give more than we replenish. What activities or people help you feel restored? When did you last make time for them?",
      "You're not a machine. Rest is a biological necessity, not a reward. What would a truly kind, 5-minute break look like for you right now?"
    ],
    color: '#81ecec', icon: '😮‍💨'
  },
  lonely: {
    keywords: ['lonely','alone','isolat','no one','nobody','abandon','forgotten','disconnected','left out','excluded','invisible','unseen','isolated'],
    responses: [
      "Loneliness is one of the deepest human pains. Please know that being alone doesn't mean you're not worthy of connection. You reaching out right now is a step toward that connection, and I'm here with you.",
      "That feeling of being disconnected can be so heavy. Can you tell me what loneliness feels like for you? Is it more about wanting deeper connection or feeling misunderstood?",
      "I see you, and you matter. Sometimes loneliness comes from not having our true selves witnessed. What part of you feels most unseen right now?",
      "It takes real strength to admit you're feeling lonely. That honesty is itself a form of reaching out, and it matters. What kind of connection would feel most nourishing to you?",
      "You are not alone in feeling alone — but I know that doesn't make it hurt less. If you could reach out to one person safely, who might that be?"
    ],
    color: '#a29bfe', icon: '🌙'
  },
  tired: {
    keywords: ['tired','exhaust','drain','fatigue','sleep','rest','burnout','worn','depleted','drained','weary','wiped','spent','lethargic'],
    responses: [
      "Rest isn't something you have to earn. Your body and mind are telling you they need replenishment. What does 'gentle with yourself' look like right now?",
      "That deep tiredness you're describing — it sounds like more than just physical. When our energy is depleted, it often affects our emotions and thinking too. What kind of rest would feel most restoring?",
      "You've been running on empty for too long. I give you permission to pause. Even five minutes of doing nothing can begin to restore you.",
      "Chronic exhaustion deserves compassion, not more pressure. What's the smallest act of self-care you could offer yourself in the next hour?",
      "I hear how tired you are. Sometimes acknowledging 'I'm exhausted' is its own form of relief. You don't have to push through alone."
    ],
    color: '#636e72', icon: '😴'
  },
  hopeless: {
    keywords: ['hopeless','despair','give up','worthless','empty','numb','can\'t go on','pointless','no point','meaningless','nothing matters','defeated'],
    responses: [
      "I'm really glad you're sharing this with me. What you're feeling is real and it's heavy. Right now it may feel like there's no way forward, but feelings shift — they always do. You've survived every difficult day you've had so far. Can we just breathe together for a moment?",
      "I hear your despair, and I want you to know: you don't have to navigate this alone. Please consider reaching out to a professional who can offer the kind of support you deserve. You matter, and there is help available.",
      "That sense of hopelessness is telling you something important about your pain. Let's sit with that. What would it mean if hope felt possible again?",
      "These feelings are overwhelming, and I want you to be safe. You don't need to have answers right now. All you need to do is stay present, one moment at a time.",
      "I can hear how much pain you're in. You deserve support. Please reach out to a crisis counselor who is trained to help — you're worth that care."
    ],
    color: '#e17055', icon: '🤍'
  },
  happy: {
    keywords: ['happy','great','wonderful','amazing','blessed','joy','grateful','excited','beautiful','thrilled','delighted','content','peaceful','elated','proud'],
    responses: [
      "That's wonderful to hear! Joy is such an important emotion to savor. What's contributing most to this feeling right now? Let's take a moment to really appreciate it together.",
      "I love that for you! It's important to acknowledge and celebrate the good moments. What helped create this positive feeling, and how can you invite more of it into your life?",
      "Gratitude and joy are powerful protective factors for mental health. What would you like to remember about this moment so you can return to it on harder days?",
      "That warmth you're feeling is real and deserved. Sometimes we rush past positive emotions — let's pause and let this one fully settle in.",
      "I'm genuinely happy for you. These bright spots matter. What's one way you can honor and extend this feeling today?"
    ],
    color: '#55efc4', icon: '☀️'
  },
  guilty: {
    keywords: ['guilt','guilty','regret','should have','could have','remorse','ashamed','shame','blame myself','sorry for','fault'],
    responses: [
      "Guilt is often a signal that we've acted against our own values. Let's explore that — which value of yours feels compromised in this situation?",
      "I hear you carrying that weight. There's a difference between 'I did something bad' and 'I am bad.' Guilt points to behavior, shame attacks the self. Which one are you experiencing?",
      "Regret can be heavy. If you could go back, what would you do differently — and what does that tell you about what matters to you now?",
      "You made the best decision you could with the awareness you had at the time. Self-compassion means acknowledging that we're all learning. What would you say to a friend feeling this way?"
    ],
    color: '#dfe6e9', icon: '💭'
  },
  hopeful: {
    keywords: ['hopeful','optimistic','motivated','inspired','determined','hoping','positive','encouraged','confident','looking forward'],
    responses: [
      "Hopefulness is beautiful — it means you can imagine a future that's meaningful to you. What's helping you feel this sense of possibility?",
      "That sense of motivation can be a powerful catalyst for change. What's one small, concrete step you could take that aligns with this hopeful feeling?",
      "I'm glad you're feeling hopeful. Hope paired with action can create real change. What values or goals are connecting you to this positive outlook?",
      "It takes strength to stay hopeful, especially when life is challenging. I celebrate that with you. What would you like to nurture this hope?"
    ],
    color: '#fdcb6e', icon: '🌟'
  },
  neutral: {
    keywords: [],
    responses: [
      "Thank you for being here with me. You don't need a specific reason to talk — whatever's on your mind is worth exploring. What's been going on?",
      "I'm glad you're here. Sometimes the most helpful conversations start with just checking in. How has your day been, really?",
      "Take your time — there's no pressure. What's present for you right now, even if it's quiet?",
      "I'm here to listen, not to judge. What would feel good to share today? It can be big, small, or anything in between.",
      "Sometimes the most important thing is just having someone to talk to. I'm that someone for you. What's on your mind today?"
    ],
    color: '#dfe6e9', icon: '💭'
  }
}

const CRISIS_KEYWORDS = [
  'kill myself','end my life','want to die','better off dead',
  'suicide','self-harm','hurt myself','cutting',
  'don\'t want to live','can\'t do this anymore','no reason to live',
  'ending it all','take my own life','suicidal','going to kill myself',
  'want to end it','ready to die','plan to kill myself','suicide attempt'
]

const CRISIS_RESPONSE = `I'm really glad you reached out. What you're feeling is real and it matters — but you don't have to face this alone.

**Immediate Support Available:**
📞 **988 Suicide & Crisis Lifeline** — Call or text 988 (US, 24/7)
📱 **Crisis Text Line** — Text HOME to 741741
🏥 **Call 911** or go to your nearest emergency room

You are not a burden. You are not alone. There is support available right now — please reach out.`

export function detectEmotion(text) {
  const lower = text.toLowerCase()
  const scores = {}
  for (const [emotion, data] of Object.entries(EMOTIONS)) {
    let s = 0
    for (const kw of data.keywords) {
      try {
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        if (new RegExp('\\b' + escaped.replace(/\\\\/g, '\\') + '\\w*', 'i').test(lower)) s++
      } catch {}
    }
    if (s > 0) scores[emotion] = s
  }
  if (Object.keys(scores).length > 0) {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  }
  return 'neutral'
}

export function isCrisis(text) {
  const lower = text.toLowerCase()
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw))
}

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral:7b'

const THERAPIST_SYSTEM_PROMPT = `You are Serenity, a warm, empathetic AI wellness companion trained in therapeutic communication. Your approach integrates person-centered therapy, CBT, DBT, ACT, and motivational interviewing.

Core principles:
- Use active listening: reflect, validate, and normalize the person's feelings
- Ask thoughtful, open-ended questions that invite exploration
- Never diagnose, prescribe medication, or claim to be a licensed therapist
- If someone is in crisis (suicidal, self-harm, domestic violence), immediately encourage professional help and provide crisis resources
- Use evidence-based techniques: gentle Socratic questioning, scaling questions, exploring values, identifying strengths, and supporting self-compassion
- Keep responses to 2-4 sentences — warm, focused, and therapeutic
- Match the person's language and emotional tone
- Remember: the person is the expert on their own life; your role is to facilitate insight, not provide answers`

export async function queryOllama(messages) {
  try {
    const recentMessages = messages.slice(-6)
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: THERAPIST_SYSTEM_PROMPT },
          ...recentMessages
        ],
        stream: false,
        options: { temperature: 0.7, num_predict: 300 }
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.message?.content || null
  } catch {
    return null
  }
}

export async function checkOllama() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`)
    if (!res.ok) return { available: false, models: [] }
    const data = await res.json()
    return { available: true, models: (data.models || []).map(m => m.name) }
  } catch {
    return { available: false, models: [] }
  }
}

export async function generateReply(text, history = []) {
  if (isCrisis(text)) {
    return { reply: CRISIS_RESPONSE, emotion: 'crisis', source: 'safety' }
  }

  const emotion = detectEmotion(text)

  try {
    const ollamaMsg = history.slice(-4).flatMap(m => [
      { role: 'user', content: m.user || '' },
      { role: 'assistant', content: m.bot || '' }
    ])
    ollamaMsg.push({ role: 'user', content: text })
    const ollamaReply = await queryOllama(ollamaMsg)
    if (ollamaReply && ollamaReply.length > 10) {
      return { reply: ollamaReply, emotion, source: 'ollama' }
    }
  } catch {}

  const replies = EMOTIONS[emotion]?.responses || EMOTIONS.neutral.responses
  const reply = replies[Math.floor(Math.random() * replies.length)]
  return { reply, emotion, source: 'template' }
}

/* ═══ WELLNESS DATA ════════════════════════════════════════ */
export const BREATHING_EXERCISES = {
  box_breathing: {
    name: 'Box Breathing', icon: '⊞', color: '#6c5ce7',
    desc: 'Inhale 4, hold 4, exhale 4, hold 4. Used by Navy SEALs for calm under pressure.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Breathe in slowly...' },
      { action: 'hold', count: 4, text: 'Hold...' },
      { action: 'breathe out', count: 4, text: 'Breathe out slowly...' },
      { action: 'hold', count: 4, text: 'Hold...' },
    ]
  },
  relaxing_breath: {
    name: '4-7-8 Breathing', icon: '🌊', color: '#00cec9',
    desc: 'Inhale 4, hold 7, exhale 8. A natural tranquilizer for the nervous system.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Breathe in through your nose...' },
      { action: 'hold', count: 7, text: 'Hold your breath...' },
      { action: 'breathe out', count: 8, text: 'Exhale slowly...' },
    ]
  },
  deep_belly: {
    name: 'Diaphragmatic Breathing', icon: '🫁', color: '#a29bfe',
    desc: 'Place a hand on your belly and feel it rise and fall with each breath.',
    pattern: [
      { action: 'breathe in', count: 5, text: 'Let your belly fill with air...' },
      { action: 'breathe out', count: 5, text: 'Slowly release...' },
    ]
  },
  calming_overflow: {
    name: 'Extended Exhalation', icon: '🍃', color: '#55efc4',
    desc: 'Longer exhales activate the parasympathetic nervous system for calm.',
    pattern: [
      { action: 'breathe in', count: 4, text: 'Softly breathe in...' },
      { action: 'breathe out', count: 8, text: 'Gently let go...' },
    ]
  }
}

export const GROUNDING_TECHNIQUES = {
  '5_4_3_2_1': {
    name: '5-4-3-2-1 Sensory Grounding', icon: '🌿',
    desc: 'Notice 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
    steps: ['Look around and name 5 things you can SEE','Notice 4 things you can TOUCH','Name 3 things you can HEAR','Notice 2 things you can SMELL','Name 1 thing you can TASTE']
  },
  body_scan: {
    name: 'Quick Body Scan', icon: '🧘',
    desc: 'Release tension held in your body from head to toe.',
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
  "What emotion was most present for you today, and where did you feel it in your body?",
  "Describe a moment of peace you experienced recently.",
  "What's something you're proud of yourself for — even something small?",
  "What would your inner child want you to know right now?",
  "What helps you feel safe and grounded when things are hard?",
  "What's a limiting belief you're ready to gently question?",
  "If calmness was a color, what would it look like right now?",
  "What's one kind thing you could say to yourself today that you rarely hear?",
  "What boundary do you need to set or reinforce right now?",
  "What activity makes you lose track of time in a good way?",
  "What are you avoiding that might actually bring relief to address?"
]

export function getDailyPrompt() {
  const seed = new Date().toISOString().slice(0, 10)
  const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return JOURNAL_PROMPTS[hash % JOURNAL_PROMPTS.length]
}

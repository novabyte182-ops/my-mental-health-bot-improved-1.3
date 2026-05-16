'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { MOOD_LEVELS } from '@/lib/ai'

export default function Home() {
  const [tab, setTab] = useState('chat')
  const [msgs, setMsgs] = useState([{ role: 'bot', text: "Hello, I'm Serenity. I'm here to listen — no judgment, just presence. How are you feeling today?" }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [ollamaStatus, setOllamaStatus] = useState('checking')
  const [moodHistory, setMoodHistory] = useState([])
  const [moodStats, setMoodStats] = useState({})
  const [moodMsg, setMoodMsg] = useState('')
  const [journalText, setJournalText] = useState('')
  const [journalEntries, setJournalEntries] = useState([])
  const [dailyPrompt, setDailyPrompt] = useState('')
  const [wellnessData, setWellnessData] = useState({ breathing: [], grounding: [] })
  const [breathing, setBreathing] = useState(null)
  const [bStep, setBStep] = useState(0)
  const [bCount, setBCount] = useState(0)
  const [bDetails, setBDetails] = useState({})
  const endRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => { scrollToEnd() }, [msgs])
  const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext('2d')
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const p = Array.from({ length: 40 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      s: Math.random() * 2 + 0.5, sx: (Math.random() - 0.5) * 0.3, sy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.35 + 0.05, col: ['rgba(108,92,231,','rgba(0,206,201,','rgba(162,155,254,'][Math.floor(Math.random()*3)]
    }))
    let id
    const anim = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      p.forEach(pt => { pt.x += pt.sx; pt.y += pt.sy; if (pt.x < 0 || pt.x > c.width || pt.y < 0 || pt.y > c.height) { pt.x = Math.random() * c.width; pt.y = Math.random() * c.height }
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.s, 0, Math.PI * 2); ctx.fillStyle = pt.col + pt.o + ')'; ctx.fill() })
      id = requestAnimationFrame(anim)
    }
    anim()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    fetch('/api/ollama').then(r => r.json()).then(d => setOllamaStatus(d.online ? 'ollama' : 'template')).catch(() => setOllamaStatus('template'))
    fetch('/api/wellspring').then(r => r.json()).then(d => {
      setWellnessData({ breathing: d.breathing || [], grounding: d.grounding || [] })
      setBDetails({ ...d.breathingDetails, ...d.groundingDetails })
      setDailyPrompt(d.dailyPrompt || '')
    }).catch(() => {})
    fetchMoods()
    fetch('/api/wellspring/journal').then(r => r.json()).then(d => { setJournalEntries(d.entries || []); if (!dailyPrompt) setDailyPrompt(d.dailyPrompt || '') }).catch(() => {})
  }, [])

  const fetchMoods = async () => {
    try { const r = await fetch('/api/wellspring/mood'); const d = await r.json(); setMoodHistory(d.history || []); setMoodStats(d.stats || {}) } catch {}
  }

  useEffect(() => {
    if (!breathing) return
    const timer = setInterval(() => {
      setBCount(c => {
        const pat = breathing.pattern
        if (!pat) return 0
        const step = pat[bStep % pat.length]
        if (c >= (step.count || 4) - 1) { setBStep(s => s + 1); return 0 }
        return c + 1
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [breathing, bStep])

  const send = useCallback(async () => {
    if (!input.trim() || loading) return
    const t = input.trim(); setInput(''); setMsgs(m => [...m, { role: 'user', text: t }]); setLoading(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: t }) })
      const d = await r.json()
      setMsgs(m => [...m, { role: 'bot', text: d.reply, emotion: d.emotion, source: d.source }])
    } catch { setMsgs(m => [...m, { role: 'bot', text: "I'm here to listen. Tell me more about what's on your mind." }]) }
    setLoading(false)
  }, [input, loading])

  const logMood = async (key) => {
    try { const r = await fetch('/api/wellspring/mood', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood: key }) });
      const d = await r.json(); setMoodMsg(d.message || 'Saved!'); fetchMoods(); setTimeout(() => setMoodMsg(''), 2500) } catch {}
  }

  const saveJournal = async () => {
    if (!journalText.trim()) return
    try { await fetch('/api/wellspring/journal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: journalText }) });
      setJournalText(''); const r = await fetch('/api/wellspring/journal'); const d = await r.json(); setJournalEntries(d.entries || []) } catch {}
  }

  const icon = (e) => ({ sad: '🌧️', anxious: '💫', angry: '🔥', stressed: '😮‍💨', lonely: '🌙', tired: '😴', hopeless: '🤍', happy: '☀️', grateful: '✨', neutral: '💭', crisis: '🤍', guilty: '💭', hopeful: '🌟' }[e] || '💭')

  const NavBtn = ({ t, i }) => (
    <button onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${tab === t ? 'bg-purple-500/20 text-purple-300 shadow-sm' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}>{i} {t}</button>
  )

  return (
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29, #1a1a4e, #24243e)' }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10 flex items-center gap-2 p-3 pb-0 overflow-x-auto">
        <div className="flex items-center gap-2 mr-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-base font-bold shadow-lg shadow-purple-500/20">S</div>
          <div className="hidden sm:block"><div className="text-sm font-bold">Serenity</div><div className="text-[10px] text-white/40">{ollamaStatus === 'ollama' ? '🟢 Local AI' : '🟡 Template'}</div></div>
        </div>
        <NavBtn t="chat" i="💬" /><NavBtn t="wellness" i="🧘" /><NavBtn t="mood" i="📊" /><NavBtn t="journal" i="📝" />
      </div>

      <div className="relative z-10 flex-1 glass m-3 mt-2 flex flex-col overflow-hidden">

        {tab === 'chat' && <>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-xs text-white/40">💬 Chat <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300">{ollamaStatus === 'ollama' ? 'Local AI' : 'Template'}</span></span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex anim-in ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'bot' && <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">S</div>}
                <div>
                  <div className={`px-3.5 py-2.5 text-sm leading-relaxed max-w-[80vw] sm:max-w-md ${m.role === 'user' ? 'chat-user' : 'chat-bot'} rounded-2xl`}>
                    {m.text.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
                  </div>
                  <div className="text-[10px] text-white/25 mt-1 px-1">{new Date().toLocaleTimeString()} {m.emotion && icon(m.emotion)} {m.source === 'ollama' && '🦙'}</div>
                </div>
                {m.role === 'user' && <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs ml-2 mt-0.5 flex-shrink-0">U</div>}
              </div>
            ))}
            {loading && <div className="flex anim-in"><div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">S</div>
              <div className="px-4 py-3 rounded-2xl chat-bot"><div className="flex gap-1.5"><span className="w-2 h-2 rounded-full bg-white/30 dot" /><span className="w-2 h-2 rounded-full bg-white/30 dot" /><span className="w-2 h-2 rounded-full bg-white/30 dot" /></div></div></div>}
            <div ref={endRef} />
          </div>
          <div className="px-4 py-3 border-t border-white/5 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Share what's on your mind..." className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-purple-500/30 transition-all placeholder:text-white/30" />
            <button onClick={send} disabled={loading || !input.trim()} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-lg disabled:opacity-30 transition-all hover:scale-105 flex-shrink-0">→</button>
          </div>
          <div className="text-[9px] text-white/25 text-center py-1.5">Not a substitute for professional care. <a href="tel:988" className="text-cyan-400/70">988</a></div>
        </>}

        {tab === 'wellness' && <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-sm text-white/40">Simple evidence-based practices to find calm and presence.</p>

          {breathing && <div className="glass p-5 text-center space-y-3">
            <div className="flex justify-center"><div className="breath-circle"><div className="breath-inner" /></div></div>
            <div className="text-base text-white/70 min-h-[3rem] flex items-center justify-center">
              {breathing.pattern?.[bStep % breathing.pattern.length]?.text || 'Starting...'}
            </div>
            <button onClick={() => { setBreathing(null); setBStep(0); setBCount(0) }} className="px-6 py-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 text-sm font-medium">Stop</button>
          </div>}

          <div><div className="text-xs text-white/30 uppercase tracking-wider mb-2">Breathing Exercises</div>
            {(wellnessData.breathing || []).map(ex => (
              <div key={ex.id} className="glass p-3 mb-1.5 cursor-pointer hover:bg-white/[0.08] transition-all" onClick={() => { const d = bDetails[ex.id]; if (d?.pattern) setBreathing(d); setBStep(0); setBCount(0) }}>
                <div className="text-sm font-medium">{ex.icon} {ex.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{ex.desc}</div>
              </div>
            ))}
          </div>

          <div><div className="text-xs text-white/30 uppercase tracking-wider mb-2 mt-3">Grounding Techniques</div>
            {(wellnessData.grounding || []).map(ex => (
              <div key={ex.id} className="glass p-3 mb-1.5 cursor-pointer hover:bg-white/[0.08] transition-all" onClick={() => { const d = bDetails[ex.id]; if (d?.steps) setBreathing({ name: d.name, steps: d.steps, pattern: d.steps.map(s => ({ text: s, count: 4 })) }) }}>
                <div className="text-sm font-medium">{ex.icon} {ex.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{ex.desc}</div>
              </div>
            ))}
          </div>
        </div>}

        {tab === 'mood' && <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-sm text-white/40">How are you feeling right now?</p>
          <div className="grid grid-cols-5 gap-2">
            {MOOD_LEVELS.map(m => (
              <button key={m.key} onClick={() => logMood(m.key)} className="glass py-3 text-center hover:bg-white/[0.08] transition-all hover:-translate-y-0.5">
                <div className="text-2xl mb-0.5">{m.emoji}</div>
                <div className="text-[10px] text-white/40">{m.label}</div>
              </button>
            ))}
          </div>
          {moodMsg && <div className="text-xs text-emerald-400 anim-in">{moodMsg}</div>}
          <div>
            <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Mood Trend (Last 14 Days)</div>
            <div className="flex items-end gap-0.5 h-16 glass p-3">
              {moodHistory.length > 0 ? moodHistory.slice(-14).map((m, i) => (
                <div key={i} className="flex-1 rounded-t relative hover:opacity-80 transition-all" style={{ height: `${(m.value / 5) * 100}%`, background: m.color, minHeight: 4 }}>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black/80 text-white px-1.5 py-0.5 rounded text-[9px] whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">{m.emoji} {m.mood}</div>
                </div>
              )) : <div className="text-xs text-white/25 w-full text-center self-center">Log your mood to see trends</div>}
            </div>
            {moodStats.count > 0 && <div className="text-xs text-white/40 mt-2">
              Average: {moodStats.average}/5 · Trend: {moodStats.trend} · {moodStats.count} entries
            </div>}
          </div>
        </div>}

        {tab === 'journal' && <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {dailyPrompt && <div className="glass p-3 cursor-pointer" onClick={() => setJournalText(dailyPrompt + '\n\n')}>
            <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-0.5">Today's Reflection Prompt</div>
            <div className="text-sm text-white/60">{dailyPrompt}</div>
          </div>}
          <textarea value={journalText} onChange={e => setJournalText(e.target.value)} rows={4} placeholder="Write whatever comes to mind — no editing needed..." className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white resize-none outline-none focus:border-purple-500/30 transition-all placeholder:text-white/30" />
          <button onClick={saveJournal} disabled={!journalText.trim()} className="px-5 py-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 text-sm font-medium disabled:opacity-30 transition-all hover:scale-105">Save Entry</button>
          <div><div className="text-xs text-white/30 uppercase tracking-wider mb-2 mt-1">Recent Entries</div>
            {journalEntries.length > 0 ? journalEntries.slice(0, 5).map((e, i) => (
              <div key={i} className="glass p-3 mb-2"><div className="text-[10px] text-white/25 mb-0.5">{e.date}</div><div className="text-sm text-white/60 leading-relaxed">{e.text.slice(0, 200)}{e.text.length > 200 ? '...' : ''}</div></div>
            )) : <div className="text-xs text-white/25">No entries yet. Try the daily prompt above.</div>}
          </div>
        </div>}

      </div>
    </div>
  )
}

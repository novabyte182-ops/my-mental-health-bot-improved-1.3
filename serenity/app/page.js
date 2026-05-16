'use client'

import { useState, useRef, useEffect } from 'react'

const EMOTIONS = {
  anxiety: { color: '#ff6b9d', icon: '😰' },
  sad: { color: '#6b5fff', icon: '😔' },
  angry: { color: '#ff4757', icon: '😠' },
  happy: { color: '#ffa502', icon: '😊' },
  neutral: { color: '#a4b0bd', icon: '😐' },
  overwhelmed: { color: '#ee5a6f', icon: '😰' },
  grateful: { color: '#2ed573', icon: '🙏' },
  calm: { color: '#54a0ff', icon: '😌' }
}

function detectEmotion(text) {
  const lower = text.toLowerCase()
  if (/worry|anxious|nervous|scared|afraid|stress/i.test(lower)) return 'anxiety'
  if (/sad|depressed|unhappy|down|hurt/i.test(lower)) return 'sad'
  if (/angry|mad|furious|rage|upset/i.test(lower)) return 'angry'
  if (/happy|excited|great|wonderful|amazing|love/i.test(lower)) return 'happy'
  if (/grateful|thank|blessed|appreciate/i.test(lower)) return 'grateful'
  if (/calm|peace|relax|serene/i.test(lower)) return 'calm'
  if (/overwhelm|stressed|pressure|busy/i.test(lower)) return 'overwhelmed'
  return 'neutral'
}

function getGreetingMessage() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning. I'm Serenity, here to listen without judgment. How are you feeling today?"
  if (hour < 17) return "Good afternoon. I'm Serenity. What's on your mind right now?"
  return "Good evening. I'm Serenity. How has your day been treating you?"
}

export default function Page() {
  const [msgs, setMsgs] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [mounted, setMounted] = useState(false)
  const endRef = useRef(null)
  const canvasRef = useRef(null)

  // Initialize with greeting
  useEffect(() => {
    setMounted(true)
    setMsgs([{
      user: '',
      bot: getGreetingMessage(),
      emotion: 'calm',
      source: 'greeting',
      timestamp: new Date()
    }])
  }, [])

  // Scroll to bottom
  useEffect(() => {
    if (mounted) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [msgs, mounted])

  // Canvas animation
  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles = []
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.life = 1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 0.002
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.fillStyle = `rgba(100, 150, 255, ${this.life * 0.1})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 30; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        if (p.life <= 0) particles.splice(i, 1)
        else {
          p.update()
          p.draw()
        }
      })
      if (particles.length < 40) particles.push(new Particle())
      requestAnimationFrame(animate)
    }
    animate()
  }, [mounted])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setLoading(true)

    // Add user message immediately
    const userEmotion = detectEmotion(userMsg)
    setMsgs(prev => [...prev, { 
      user: userMsg, 
      bot: '', 
      emotion: userEmotion, 
      source: 'user',
      timestamp: new Date()
    }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMsg })
      })
      const data = await res.json()
      
      // Add bot response
      setMsgs(prev => [...prev, {
        user: '',
        bot: data.reply || "I'm here to listen. Tell me more.",
        emotion: data.emotion || detectEmotion(userMsg),
        source: data.source || 'api',
        timestamp: new Date()
      }])
    } catch (e) {
      console.log("[v0] Chat error:", e.message)
      setMsgs(prev => [...prev, {
        user: '',
        bot: "I hear you. That sounds important. Tell me more about what you're experiencing.",
        emotion: 'calm',
        source: 'fallback',
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29, #1a1a4e, #24243e)' }}>
      {mounted && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />}
      
      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-lg">S</div>
          <div>
            <h1 className="font-bold text-white text-lg">Serenity</h1>
            <p className="text-xs text-gray-400">AI Wellness Companion - Public Chat</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className="space-y-2">
              {/* User Message */}
              {m.user && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl px-4 py-3 max-w-lg">
                    <p className="text-sm leading-relaxed break-words">{m.user}</p>
                    <p className="text-xs text-white/60 mt-1">
                      {m.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Bot Message */}
              {m.bot && m.bot !== '...' && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-lg">
                    {EMOTIONS[m.emotion]?.icon || '🤖'}
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl px-4 py-3 max-w-lg border border-white/20">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{m.bot}</p>
                    {m.source !== 'greeting' && (
                      <p className="text-xs text-white/40 mt-2">
                        {m.emotion} • {m.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {m.source === 'api' && '🔗'}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Loading indicator */}
              {m.bot === '...' && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-sm">
                    <div className="animate-pulse">·</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl px-4 py-3 border border-white/20">
                    <p className="text-sm">Serenity is thinking...</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share what's on your mind..."
            disabled={loading}
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-full px-6 py-2 font-semibold transition"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          Not a substitute for professional care. In crisis? Call or text <a href="tel:988" className="text-cyan-400 hover:underline">988</a>
        </p>
      </div>
    </div>
  )
}

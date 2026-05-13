import { checkOllama } from '@/lib/ai'

export async function GET() {
  const status = await checkOllama()
  return Response.json({
    online: status.available,
    models: status.models,
    recommended: status.models.includes('mistral:7b') ? 'mistral:7b' : (status.models[0] || 'none'),
    message: status.available ? 'Ollama connected' : 'Ollama not found — using template fallback'
  })
}

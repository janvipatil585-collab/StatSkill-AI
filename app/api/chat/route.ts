import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json() as { message?: string; profile?: { role?: string; goal?: string } }
  const message = body.message?.trim().slice(0, 1000)
  if (!message) return NextResponse.json({ error: 'A message is required.' }, { status: 400 })
  const key = process.env.OPENAI_API_KEY
  if (!key) return NextResponse.json({ reply: `For a ${body.profile?.role || 'public-sector professional'} focused on ${body.profile?.goal || 'career growth'}, start by strengthening the competency most relevant to your next assignment. I can help you turn that goal into a practical learning plan.` , mode: 'fallback' })
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.4, messages: [{ role: 'system', content: 'You are StatSkill AI, an explainable learning advisor for government statistics professionals. Give concise, practical, safe advice.' }, { role: 'user', content: `Profile: ${JSON.stringify(body.profile || {})}\nQuestion: ${message}` }] }) })
    if (!response.ok) throw new Error('AI request failed')
    const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> }
    return NextResponse.json({ reply: result.choices?.[0]?.message?.content || 'I could not generate a response.', mode: 'ai' })
  } catch { return NextResponse.json({ reply: 'The advisor is temporarily unavailable. Please try again with a specific competency or learning goal.', mode: 'fallback' }) }
}

import { NextResponse } from 'next/server'

const fallbackQuestions = [
  { question: 'Which practice best supports evidence-based decision making?', options: ['Personal intuition', 'Reliable data and analysis', 'Random selection', 'Historical assumptions'], answer: 1, explanation: 'Reliable data, quality checks, and analysis provide a defensible evidence base.' },
  { question: 'What should you check before interpreting an official dataset?', options: ['Metadata and data quality', 'Only the largest values', 'Nothing', 'The file name'], answer: 0, explanation: 'Metadata defines the population, measures, methods, and limitations.' },
  { question: 'Which action improves analytical transparency?', options: ['Documenting assumptions', 'Hiding limitations', 'Changing results', 'Using unexplained jargon'], answer: 0, explanation: 'Documented assumptions let peers understand and challenge the analysis.' },
]

function cleanCount(value: unknown) { const count = Number(value); return Number.isInteger(count) ? Math.min(20, Math.max(3, count)) : 10 }

export async function POST(request: Request) {
  try {
    const body = await request.json() as { topic?: string; count?: number; difficulty?: string; sourceText?: string }
    const topic = body.topic?.trim().slice(0, 120) || 'official statistics'
    const count = cleanCount(body.count)
    const key = process.env.OPENAI_API_KEY
    if (!key) return NextResponse.json({ mode: 'fallback', topic, questions: Array.from({ length: count }, (_, index) => fallbackQuestions[index % fallbackQuestions.length]) })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.2, response_format: { type: 'json_object' }, messages: [
        { role: 'system', content: 'Create rigorous multiple-choice assessments. Return JSON only with a questions array. Each item has question, options (exactly four strings), answer (zero-based integer), and explanation.' },
        { role: 'user', content: `Create ${count} ${body.difficulty || 'mixed'} questions about ${topic}. Source notes: ${(body.sourceText || '').slice(0, 12000)}` },
      ] }),
    })
    if (!response.ok) throw new Error('AI provider request failed')
    const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> }
    const parsed = JSON.parse(result.choices?.[0]?.message?.content || '{}')
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) throw new Error('Invalid assessment response')
    return NextResponse.json({ mode: 'ai', topic, questions: parsed.questions.slice(0, count) })
  } catch {
    return NextResponse.json({ mode: 'fallback', topic: 'official statistics', questions: fallbackQuestions }, { status: 200 })
  }
}

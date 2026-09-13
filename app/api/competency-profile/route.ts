import { NextResponse } from 'next/server'
import { assessmentRecommendations, calculateCompetencyAssessment } from '@/lib/competency'
import type { Profile } from '@/lib/catalog'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { profile?: Profile; ratings?: Record<string, number> }
    if (!body.profile?.name || !body.profile.role || !body.profile.experience) return NextResponse.json({ error: 'Please complete your profile before continuing.' }, { status: 400 })
    const ratings = body.ratings || {}
    if (!Object.keys(ratings).length || Object.values(ratings).some((rating) => !Number.isInteger(rating) || rating < 1 || rating > 5)) return NextResponse.json({ error: 'Please rate every competency from 1 to 5.' }, { status: 400 })
    const assessment = calculateCompetencyAssessment(body.profile, ratings)
    const recommendations = assessmentRecommendations(body.profile, assessment)
    return NextResponse.json({ profile: { ...body.profile, scores: { ...body.profile.scores, ...assessment.scores } }, assessment, recommendations, learningPath: recommendations.map((item, index) => ({ priority: index + 1, competency: item.skill, match: Math.min(99, 60 + assessment.gaps[index].gap), status: 'Not started' })) })
  } catch {
    return NextResponse.json({ error: 'Unable to save your competency profile. Please try again.' }, { status: 500 })
  }
}

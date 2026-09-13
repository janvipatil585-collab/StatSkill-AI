import type { Profile, Role } from '@/lib/catalog'

export type CompetencyAssessment = {
  ratings: Record<string, number>
  scores: Record<string, number>
  targets: Record<string, number>
  gaps: Array<{ skill: string; current: number; target: number; gap: number; category: 'Critical Gaps' | 'Areas to Improve' | 'Strong Areas' }>
  overall: number
  timestamp: string
}

const roleTargets: Partial<Record<Role, Record<string, number>>> = {
  'Senior Investigator': { Statistics: 80, 'Data Quality': 80, 'Data Visualization': 75, Python: 65, SQL: 65, Sampling: 70 },
  'Statistical Officer': { Statistics: 90, Sampling: 85, 'Survey Design': 85, 'Data Quality': 85, Python: 70, SQL: 70, 'Data Visualization': 75 },
  'Senior Statistical Officer': { Statistics: 95, Sampling: 90, 'Survey Design': 90, 'Data Quality': 90, Python: 75, SQL: 75, 'Data Visualization': 80 },
  'Survey Officer': { Sampling: 90, 'Survey Design': 90, Statistics: 80, 'Data Quality': 85, Python: 60, SQL: 60 },
}

export function calculateCompetencyAssessment(profile: Profile, ratings: Record<string, number>): CompetencyAssessment {
  const scores = Object.fromEntries(Object.entries(ratings).map(([skill, rating]) => [skill, rating * 20]))
  const targets = { ...Object.fromEntries(Object.keys(scores).map((skill) => [skill, 75])), ...(roleTargets[profile.role] || {}) }
  const gaps = Object.keys(scores).map((skill) => {
    const current = scores[skill] ?? 0
    const target = targets[skill] ?? 75
    const gap = Math.max(0, target - current)
    const category = gap >= 30 ? 'Critical Gaps' : gap >= 15 ? 'Areas to Improve' : 'Strong Areas'
    return { skill, current, target, gap, category }
  }).sort((a, b) => b.gap - a.gap)
  return { ratings, scores, targets, gaps, overall: Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / Math.max(1, Object.values(scores).length)), timestamp: new Date().toISOString() }
}

export function assessmentRecommendations(profile: Profile, assessment: CompetencyAssessment) {
  return assessment.gaps.filter((gap) => gap.gap > 0).slice(0, 3).map((gap) => ({ skill: gap.skill, explanation: `${gap.skill} is one of your largest competency gaps. Your current self-assessed level is ${gap.current}%, while the target for your ${profile.role} role is ${gap.target}%.` }))
}

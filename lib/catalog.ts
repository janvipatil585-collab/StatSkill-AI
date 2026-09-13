export type SkillLevel = 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert'
export type Role = 'Statistical Officer' | 'Junior Statistical Officer' | 'Senior Statistical Officer' | 'Senior Investigator' | 'Data Analyst' | 'Economist' | 'Survey Officer' | 'Research Officer' | 'IT / Data Officer' | 'Administrator' | 'Other'
export type Source = 'iGOT' | 'NSSTA'

export const roles: Role[] = ['Statistical Officer','Junior Statistical Officer','Senior Statistical Officer','Senior Investigator','Data Analyst','Economist','Survey Officer','Research Officer','IT / Data Officer','Administrator','Other']
export const experienceBands = ['0–2 years','3–5 years','6–10 years','10+ years']
export const skills = ['Python','R','SQL','Statistics','Sampling','Survey Design','Data Visualization','GIS','AI/ML','Cloud Computing','Data Privacy','Cybersecurity','National Accounts','Labour Statistics','Agricultural Statistics','SDG Indicators','Data Quality','Official Statistics Ethics']

export type Profile = { name: string; email: string; organization: string; designation: string; role: Role; experience: string; qualification: string; assignment: string; goal: string; interests: string[]; skillLevels: Record<string, SkillLevel>; scores: Record<string, number> }
export type Course = { id: string; title: string; provider: string; description: string; duration: string; competency: string; level: SkillLevel; roles: Role[]; url: string; source: 'iGOT'; interests: string[] }
export type Programme = { id: string; title: string; topic: string; audience: string; type: string; year: string; competency: string; roles: Role[]; url: string; source: 'NSSTA' }

const igotUrl = 'https://igotkarmayogi.gov.in/'
const nsstaUrl = 'https://mospi.gov.in/nssta'
const allRoles = roles
export const courses: Course[] = [
  {id:'igot-dddm',title:'Data Driven Decision Making For Government',provider:'iGOT Karmayogi',description:'Build practical confidence using evidence, data interpretation, and decision frameworks in public service.',duration:'2h 30m',competency:'Statistics',level:'Basic',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Data Analytics','Policy']},
  {id:'igot-policy',title:'Fundamentals of Public Policy',provider:'iGOT Karmayogi',description:'Understand policy cycles, evidence, implementation, and evaluation for government programmes.',duration:'3h 15m',competency:'Statistics',level:'Beginner',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Policy','Leadership']},
  {id:'igot-emerging',title:'Introduction to Emerging Technologies',provider:'iGOT Karmayogi',description:'A foundational overview of AI, cloud, data platforms, and technology-led public service.',duration:'2h 45m',competency:'AI/ML',level:'Beginner',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Data Analytics','Technology']},
  {id:'igot-ai',title:'Artificial Intelligence for Public Service',provider:'iGOT Karmayogi',description:'Explore responsible AI concepts and practical use cases for public administration and statistics.',duration:'4h 00m',competency:'AI/ML',level:'Intermediate',roles:['Data Analyst','IT / Data Officer','Administrator','Statistical Officer'],url:igotUrl,source:'iGOT',interests:['Data Analytics','AI']},
  {id:'igot-digital-safety',title:'Digital Safety and Cyber Hygiene',provider:'iGOT Karmayogi',description:'Learn safe digital practices, privacy fundamentals, and cyber hygiene for government work.',duration:'1h 20m',competency:'Cybersecurity',level:'Beginner',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Technology','Security']},
  {id:'igot-r',title:'R for Statistical Computing',provider:'iGOT Karmayogi',description:'Work with reproducible statistical workflows, data preparation, and analysis in R.',duration:'8h 45m',competency:'R',level:'Intermediate',roles:['Statistical Officer','Senior Statistical Officer','Data Analyst','Research Officer','Economist'],url:igotUrl,source:'iGOT',interests:['Data Analytics','Research']},
  {id:'igot-python',title:'Python for Data Analysis',provider:'iGOT Karmayogi',description:'Build foundations in Python syntax, tabular data, visualisation, and analytical workflows.',duration:'7h 30m',competency:'Python',level:'Intermediate',roles:['Data Analyst','IT / Data Officer','Statistical Officer','Research Officer'],url:igotUrl,source:'iGOT',interests:['Data Analytics','AI']},
  {id:'igot-sql',title:'Working with Data and SQL',provider:'iGOT Karmayogi',description:'Learn relational data concepts, querying, joins, and responsible data handling.',duration:'5h 10m',competency:'SQL',level:'Intermediate',roles:['Data Analyst','IT / Data Officer','Statistical Officer'],url:igotUrl,source:'iGOT',interests:['Data Analytics']},
  {id:'igot-visuals',title:'Data Visualization for Clear Communication',provider:'iGOT Karmayogi',description:'Turn statistical outputs into accessible stories, charts, and decision-ready briefings.',duration:'3h 40m',competency:'Data Visualization',level:'Intermediate',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Communication','Data Analytics']},
  {id:'igot-privacy',title:'Data Privacy in Government',provider:'iGOT Karmayogi',description:'Apply privacy-by-design thinking and responsible handling of public data.',duration:'2h 00m',competency:'Data Privacy',level:'Basic',roles:allRoles,url:igotUrl,source:'iGOT',interests:['Security','Governance']},
]
export const programmes: Programme[] = [
 {id:'nssta-sampling',title:'Sampling Methods and Applications',topic:'Sampling design, estimation, and non-response',audience:'Statistical and survey officers',type:'Residential training',year:'2026',competency:'Sampling',roles:['Statistical Officer','Junior Statistical Officer','Senior Statistical Officer','Survey Officer','Research Officer'],url:nsstaUrl,source:'NSSTA'},
 {id:'nssta-price',title:'Price Statistics',topic:'Price indices, collection systems, and validation',audience:'Economic and price statistics teams',type:'Specialized programme',year:'2026',competency:'Statistics',roles:['Statistical Officer','Economist','Senior Statistical Officer'],url:nsstaUrl,source:'NSSTA'},
 {id:'nssta-national',title:'National Accounts Statistics',topic:'National accounts concepts and compilation',audience:'National accounts officers and economists',type:'Specialized programme',year:'2026',competency:'National Accounts',roles:['Economist','Statistical Officer','Senior Statistical Officer'],url:nsstaUrl,source:'NSSTA'},
 {id:'nssta-social',title:'Social Statistics and SDG Indicators',topic:'Social indicators, metadata, and SDG reporting',audience:'Social statistics and policy teams',type:'Workshop',year:'2026',competency:'SDG Indicators',roles:['Statistical Officer','Research Officer','Economist','Administrator'],url:nsstaUrl,source:'NSSTA'},
 {id:'nssta-agri',title:'Agricultural Statistics',topic:'Agricultural surveys, crop estimation, and data quality',audience:'Agriculture and field survey teams',type:'Field-oriented training',year:'2026',competency:'Agricultural Statistics',roles:['Survey Officer','Statistical Officer','Junior Statistical Officer'],url:nsstaUrl,source:'NSSTA'},
 {id:'nssta-bigdata',title:'AI, Big Data and Machine Learning in Official Statistics',topic:'Modern data sources and responsible ML',audience:'Statistical, IT, and data science officers',type:'Advanced programme',year:'2026',competency:'AI/ML',roles:['Data Analyst','IT / Data Officer','Statistical Officer','Research Officer'],url:nsstaUrl,source:'NSSTA'},
]

export function gapScore(profile: Profile, skill: string) { return Math.max(0, 100 - (profile.scores[skill] ?? 25)) }
export function matchCourse(profile: Profile, item: Course | Programme) {
 const gap = gapScore(profile, item.competency) * .4
 const role = item.roles.includes(profile.role) ? 20 : 7
 const goal = profile.goal.toLowerCase().includes('data') && ['Python','SQL','AI/ML','Data Visualization'].includes(item.competency) ? 15 : profile.interests.some((x) => item.source === 'iGOT' && item.interests.includes(x)) ? 10 : 4
 const experience = profile.experience === '3–5 years' && item.level !== 'Expert' ? 10 : 7
 const difficulty = profile.scores[item.competency] < 45 && item.level !== 'Advanced' ? 10 : 6
 const interest = profile.interests.some((x) => (item.source === 'iGOT' ? item.interests.includes(x) : item.topic.toLowerCase().includes(x.toLowerCase()))) ? 5 : 2
 return Math.min(99, Math.round(gap + role + goal + experience + difficulty + interest))
}
export function explanation(profile: Profile, item: Course | Programme) { const score = profile.scores[item.competency] ?? 25; return `Your ${item.competency} competency is currently ${score}%, while a strong benchmark for ${profile.role} is 75%. This ${item.source} recommendation directly addresses that gap and supports your goal in ${profile.goal || 'career growth'}.` }

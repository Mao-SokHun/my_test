import { FILTER_ALL, majorOptions, subjectOptions } from './filters'

/** Tailwind gradient pairs for community cards */
export const COMMUNITY_GRADIENTS = [
  'from-primary-200 to-primary-400 text-primary-800',
  'from-sky-200 to-sky-400 text-sky-900',
  'from-emerald-200 to-emerald-400 text-emerald-900',
  'from-amber-200 to-amber-400 text-amber-900',
  'from-purple-200 to-purple-400 text-purple-900',
  'from-rose-200 to-rose-400 text-rose-900',
  'from-cyan-200 to-cyan-400 text-cyan-900',
  'from-indigo-200 to-indigo-400 text-indigo-900',
]

export const COMMUNITY_CARD_GRADIENTS = [
  'from-primary-400 to-primary-500',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500',
  'from-violet-500 to-purple-600',
  'from-rose-400 to-rose-600',
]

export const COMMUNITY_CATEGORIES = [
  'Technology',
  'Business',
  'STEM',
  'Language',
  'Engineering',
  'Design',
  'Education',
  'Other',
]

/** Feed filter tabs on Community page */
export const COMMUNITY_FEED_TABS = ['ALL POSTS', ...COMMUNITY_CATEGORIES.map((c) => c.toUpperCase())]

const MAJOR_SHORT = {
  'Information Technology': 'IT',
  'Computer Science': 'CS',
  'Software Engineering': 'SE',
  'Computer Engineering': 'CE',
  'Business': 'BUS',
  Accounting: 'ACC',
  Economics: 'ECO',
  Finance: 'FIN',
  Marketing: 'MKT',
  Management: 'MGT',
  'Digital Marketing': 'DM',
  'Data Science': 'DS',
  'Cyber Security': 'SEC',
  'Artificial Intelligence': 'AI',
  'Network Engineering': 'NET',
  'Graphic Design': 'GD',
  Architecture: 'ARCH',
  Education: 'EDU',
  English: 'ENG',
  Law: 'LAW',
  Medicine: 'MED',
  'Civil Engineering': 'CIV',
  'Electrical Engineering': 'EE',
  'Mechanical Engineering': 'ME',
}

const SUBJECT_SHORT = {
  Java: 'Java',
  JavaScript: 'JS',
  'Node JS': 'Node',
  'React JS': 'React',
  'Next JS': 'Next',
  'Vue JS': 'Vue',
  Angular: 'Ng',
  Python: 'Py',
  PHP: 'PHP',
  Laravel: 'Lara',
  'C#': 'C#',
  '.NET': '.NET',
  'C++': 'C++',
  C: 'C',
  SQL: 'SQL',
  MySQL: 'SQL',
  PostgreSQL: 'PG',
  MongoDB: 'MDB',
  'Data Structures': 'DS',
  Algorithms: 'Algo',
  'UI/UX Design': 'UX',
  'Machine Learning': 'ML',
  'Cyber Security': 'Sec',
  Networking: 'Net',
  'Mobile Development': 'Mob',
  Flutter: 'Flut',
  Android: 'And',
  iOS: 'iOS',
  English: 'ENG',
  Mathematics: 'Math',
  Physics: 'Phys',
  Statistics: 'Stat',
  Calculus: 'Calc',
}

const CATEGORY_ICONS = {
  Technology: '💻',
  Business: '📈',
  STEM: '📐',
  Language: '🗣️',
  Engineering: '⚙️',
  Design: '🎨',
  Education: '📚',
  Other: '💡',
}

function hashCode(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

function pseudoCount(seed, min, max) {
  return min + (hashCode(seed) % (max - min + 1))
}

function slugId(type, name) {
  return `${type}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function toShort(label, type) {
  if (type === 'major' && MAJOR_SHORT[label]) return MAJOR_SHORT[label]
  if (type === 'subject' && SUBJECT_SHORT[label]) return SUBJECT_SHORT[label]
  const words = label.split(/\s+/).filter(Boolean)
  if (words.length === 1) return label.slice(0, 4)
  return words
    .map((w) => w[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()
}

function categorizeMajor(major) {
  const m = major.toLowerCase()
  if (/computer|software|information|data|cyber|artificial|network|digital/.test(m)) return 'Technology'
  if (/business|accounting|economics|finance|marketing|management/.test(m)) return 'Business'
  if (/engineering|civil|electrical|mechanical|architecture/.test(m)) return 'Engineering'
  if (/design|graphic/.test(m)) return 'Design'
  if (/english|education|law|medicine/.test(m)) return 'Education'
  return 'Other'
}

function categorizeSubject(subject) {
  const s = subject.toLowerCase()
  if (/java|script|node|react|vue|angular|python|php|laravel|c#|\.net|c\+\+|\bc\b|sql|mongo|flutter|android|ios|mobile|machine|cyber|network|ui|ux|algorithm|data struct/.test(s)) {
    return 'Technology'
  }
  if (/math|physics|stat|calculus/.test(s)) return 'STEM'
  if (/english/.test(s)) return 'Language'
  return 'STEM'
}

function buildCommunity(type, label) {
  const category = type === 'major' ? categorizeMajor(label) : categorizeSubject(label)
  const seed = `${type}:${label}`
  const gradientIdx = hashCode(seed) % COMMUNITY_GRADIENTS.length
  const cardIdx = hashCode(seed) % COMMUNITY_CARD_GRADIENTS.length

  return {
    id: slugId(type, label),
    type,
    label,
    name: type === 'major' ? `${label} Hub` : `${label} Community`,
    short: toShort(label, type),
    description:
      type === 'major'
        ? `Students and teachers in ${label} — share resources, ask questions, and grow together.`
        : `Discuss ${label}, share study tips, and learn with peers on RokKru.`,
    members: pseudoCount(seed, 64, 520),
    topics: pseudoCount(`${seed}:topics`, 12, 120),
    category,
    color: COMMUNITY_CARD_GRADIENTS[cardIdx],
    badgeGradient: COMMUNITY_GRADIENTS[gradientIdx],
    icon: CATEGORY_ICONS[category] ?? '💡',
  }
}

const majors = majorOptions.filter((m) => m !== FILTER_ALL.major)
const subjects = subjectOptions.filter((s) => s !== FILTER_ALL.subject)

export const majorCommunities = majors.map((m) => buildCommunity('major', m))
export const subjectCommunities = subjects.map((s) => buildCommunity('subject', s))
export const allCommunities = [...majorCommunities, ...subjectCommunities]

const FEATURED_LABELS = [
  { type: 'subject', label: 'Mathematics' },
  { type: 'subject', label: 'Python' },
  { type: 'subject', label: 'React JS' },
  { type: 'subject', label: 'English' },
  { type: 'major', label: 'Information Technology' },
  { type: 'major', label: 'Data Science' },
  { type: 'major', label: 'Business' },
  { type: 'subject', label: 'Machine Learning' },
]

export const featuredCommunities = FEATURED_LABELS.map(({ type, label }) =>
  allCommunities.find((c) => c.type === type && c.label === label)
).filter(Boolean)

/** Sidebar & legacy mockData */
export const browseCommunities = featuredCommunities.length ? featuredCommunities : allCommunities.slice(0, 8)

export function findCommunityById(id) {
  return allCommunities.find((c) => c.id === id)
}

export function filterCommunities(list, query) {
  const q = query?.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.label.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.short.toLowerCase().includes(q)
  )
}

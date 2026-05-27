/** Match subject filter against teacher subject tags (partial / word match) */
export function teacherMatchesSubject(teacherSubjects, subject) {
  if (!subject || subject === 'All Subjects') return true
  const needle = subject.toLowerCase().replace(/\./g, '').trim()
  const words = needle.split(/\s+/).filter((w) => w.length > 1)

  return teacherSubjects.some((raw) => {
    const hay = raw.toLowerCase().replace(/\./g, '')
    if (hay.includes(needle) || needle.includes(hay)) return true
    return words.some((w) => hay.includes(w))
  })
}

export function filterTeachers(teachers, { major, subject, location, sort }) {
  let list = teachers.filter((t) => {
    if (major && major !== 'All Majors' && t.major && t.major !== major) return false
    if (!teacherMatchesSubject(t.subjects ?? [], subject)) return false
    if (location && location !== 'All Provinces' && t.location !== location) return false
    return true
  })

  switch (sort) {
    case 'Highest Rated':
      list = [...list].sort((a, b) => b.rating - a.rating)
      break
    case 'Most Popular':
    case 'Most Students':
      list = [...list].sort((a, b) => (b.students ?? 0) - (a.students ?? 0))
      break
    case 'Price: Low to High':
      list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      break
    case 'Price: High to Low':
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      break
    case 'Most Reviewed':
      list = [...list].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
      break
    default:
      break
  }

  return list
}

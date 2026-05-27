// ================ Start mentor mapper ================
// ? Backend JSON (snake_case, firstname) → UI teacher object (name, subjects)
// ? Used after every fetchMentorById / searchMentors item

export function mapMentorToTeacher(mentor) {
  if (!mentor) return null

  const id = mentor.user_id ?? mentor.id
  const skills = mentor.MentorSkills || mentor.mentorSkills || []
  const subjects = skills
    .map((ms) => ms.SubSkill?.skill_name || ms.subSkill?.skill_name)
    .filter(Boolean)

  const first = mentor.firstname || ''
  const last = mentor.lastname || ''

  return {
    id: String(id),
    user_id: id,
    name: `${first} ${last}`.trim() || 'Mentor',
    firstname: first,
    lastname: last,
    title: mentor.description?.slice(0, 80) || 'Mentor',
    subjects,
    major: skills[0]?.SubSkill?.Skill?.skill_name || '',
    rating: mentor.rating ?? 4.5, // ? no reviews table yet — default
    reviewCount: mentor.reviewCount ?? 0,
    students: mentor.students ?? 0,
    location: mentor.address || '',
    experience: mentor.experience_years ?? 0,
    verified: true,
    online: true,
    bio: mentor.description || '',
    price: mentor.price ?? 0,
    profile_picture: mentor.profile_picture,
    gender: mentor.gender,
    phone_number: mentor.phone_number,
    raw: mentor, // ? full API row if UI needs more fields later
  }
}

// ? EditProfile form → PUT /mentors/:userId body
export function mapTeacherFormToMentorPayload(form) {
  return {
    firstname: form.firstName ?? form.firstname,
    lastname: form.lastName ?? form.lastname,
    phone_number: form.phone ?? form.phone_number,
    address: form.province
      ? `${form.province}${form.city ? `, ${form.city}` : ''}`
      : form.address,
    experience_years: parseInt(form.experience ?? form.experience_years ?? 0, 10) || 0,
    description: form.bio ?? form.description,
    profile_picture: form.profile_picture,
    gender: form.gender,
  }
}
// ================ End mentor mapper ================

/** API path constants — must match `backend/src/routes/v1` */

export const ENDPOINTS = {
  health: '/health',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPasswordRequestOtp: '/auth/forgot-password/request-otp',
    forgotPasswordVerifyOtp: '/auth/forgot-password/verify-otp',
    forgotPasswordReset: '/auth/forgot-password/reset',
  },

  /** @deprecated UI label "teacher" — backend uses mentors */
  teachers: {
    list: '/mentors',
    byId: (id) => `/mentors/${id}`,
  },

  // ? Mentor System (tasks #1–#6) — prefer mentorsApi.js for fetch calls
  mentors: {
    list: '/mentors',
    search: '/mentors/search',
    me: '/mentors/me',
    byId: (id) => `/mentors/${id}`,
    analytics: '/mentors/me/analytics',
    portfolio: (id) => `/mentors/${id}/portfolio`,
    skills: (id) => `/mentors/${id}/skills`,
    skillCatalog: '/mentors/skills/catalog',
    posts: (id) => `/mentors/${id}/posts`,
    postById: (postId) => `/mentors/posts/${postId}`,
  },

  communities: {
    list: '/communities',
    byId: (id) => `/communities/${id}`,
  },

  sessions: {
    list: '/sessions',
    byId: (id) => `/sessions/${id}`,
  },

  users: {
    list: '/users',
    byId: (id) => `/users/${id}`,
  },

  admin: {
    reports: '/admin/reports',
    content: '/admin/content',
  },
}

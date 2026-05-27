/** API path constants — must match `backend/src/routes/v1` */

export const ENDPOINTS = {
  health: '/health',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },

  teachers: {
    list: '/teachers',
    byId: (id) => `/teachers/${id}`,
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

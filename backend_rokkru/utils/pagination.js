exports.paginate = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1)
  const pageSize = Math.min(100, Math.max(1, parseInt(query.pageSize, 10) || 20))
  const offset = (page - 1) * pageSize
  return { page, pageSize, offset, limit: pageSize }
}

exports.paginatedResponse = (rows, count, { page, pageSize }) => ({
  data: rows,
  total: count,
  page,
  pageSize,
  totalPages: Math.ceil(count / pageSize),
})

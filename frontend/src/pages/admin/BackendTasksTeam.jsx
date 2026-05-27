// ------------ Start backend tasks team page ------------
// UI តារាង BACKEND TASKS TEAM (ដូច Notion dark board ក្នុង sample)
// route: /admin/backend-tasks | data: constants/backendTasksTeam.js

import { useMemo, useState } from 'react'
import { Search, Filter, LayoutList } from 'lucide-react'
import clsx from 'clsx'
import {
  BACKEND_TASK_COLUMNS,
  BACKEND_TASK_ROWS,
} from '@/constants/backendTasksTeam'

// ------------ Start status badge component ------------
// pill បង្ហាញ Done / In Progress
function StatusBadge({ status }) {
  const isDone = status === 'Done'
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
        isDone
          ? 'bg-[#3f3f3f] text-[#e0e0e0]'
          : 'bg-[#5c2b2b] text-[#f5c4c4]'
      )}
    >
      {status}
    </span>
  )
}
// ------------ End status badge component ------------

// ------------ Start priority badge component ------------
function PriorityBadge({ priority }) {
  const styles = {
    Critical: 'bg-[#6b2d2d] text-[#ffc9c9]',
    High: 'bg-[#6b4a2a] text-[#ffe4b8]',
    Medium: 'bg-[#5a4a32] text-[#e8d5b5]',
  }
  return (
    <span
      className={clsx(
        'inline-flex px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
        styles[priority] || 'bg-[#3f3f3f] text-[#ccc]'
      )}
    >
      {priority}
    </span>
  )
}
// ------------ End priority badge component ------------

// ------------ Start tag cell component ------------
function TagCell({ tags }) {
  return (
    <span className="text-sm text-[#9b9b9b] capitalize">{tags}</span>
  )
}
// ------------ End tag cell component ------------

const BackendTasksTeam = () => {
  // Start filter state — ស្វែងរក + filter status
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  // End filter state

  // Start compute filtered rows
  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return BACKEND_TASK_ROWS.filter((row) => {
      const matchesStatus =
        statusFilter === 'all' || row.status === statusFilter
      const matchesQuery =
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.tags.toLowerCase().includes(query) ||
        row.member.toLowerCase().includes(query) ||
        row.description.toLowerCase().includes(query)
      return matchesStatus && matchesQuery
    })
  }, [searchQuery, statusFilter])

  const doneCount = BACKEND_TASK_ROWS.filter((r) => r.status === 'Done').length
  const inProgressCount = BACKEND_TASK_ROWS.filter((r) => r.status === 'In Progress').length
  // End compute filtered rows

  return (
    <div className="space-y-4">
      {/* page title bar — ចំណងជើង BACKEND TASKS TEAM */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-slate-500" />
          <h1 className="text-lg font-bold text-slate-800 tracking-tight uppercase">
            Backend Tasks Team
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Done {doneCount} · In Progress {inProgressCount} · Total {BACKEND_TASK_ROWS.length}
        </p>
      </div>

      {/* dark notion board container */}
      <div className="rounded-xl border border-[#2f2f2f] bg-[#191919] text-[#e8e8e8] overflow-hidden shadow-xl">
        {/* toolbar — search + filter */}
        <div className="flex flex-col sm:flex-row gap-2 p-3 border-b border-[#2f2f2f] bg-[#202020]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-sm text-[#e8e8e8] placeholder:text-[#6b6b6b] focus:outline-none focus:ring-1 focus:ring-[#5c5c5c]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#6b6b6b] shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-sm text-[#e8e8e8] focus:outline-none"
            >
              <option value="all">All status</option>
              <option value="Done">Done</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-[#2f2f2f] bg-[#202020]">
                {BACKEND_TASK_COLUMNS.map((col) => (
                  <th
                    key={col.id}
                    className={clsx(
                      'px-3 py-2.5 text-xs font-semibold text-[#8a8a8a] uppercase tracking-wide',
                      col.width
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={BACKEND_TASK_COLUMNS.length} className="px-3 py-8 text-center text-[#6b6b6b]">
                    No tasks match your search.
                  </td>
                </tr>
              )}
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#252525] hover:bg-[#232323] transition-colors"
                >
                  {/* task name column */}
                  <td className="px-3 py-2.5 font-medium text-[#f0f0f0] whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-3 py-2.5">
                    <TagCell tags={row.tags} />
                  </td>
                  <td className="px-3 py-2.5 text-[#b8b8b8] capitalize">{row.member}</td>
                  <td className="px-3 py-2.5 text-[#9b9b9b] text-xs">{row.day}</td>
                  <td className="px-3 py-2.5">
                    <PriorityBadge priority={row.priority} />
                  </td>
                  <td className="px-3 py-2.5 text-[#9b9b9b] text-xs leading-relaxed max-w-md">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {/* footer note — ពន្យល្យខ្មែរ */}
        តារាងនេះជា frontend view សម្រាប់តាមដាន backend tasks (read-only) — ដូច sample Notion team board។
      </p>
    </div>
  )
}

export default BackendTasksTeam
// ------------ End backend tasks team page ------------

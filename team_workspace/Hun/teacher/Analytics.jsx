import { useState } from 'react'
import { FileText, Download, Eye, Users, BookOpen, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '../../lib/utils'
import {
  PageScaffold,
  PageCard,
  StatMetric,
  FilterBar,
  PageAmbient,
} from '../../components'

const WEEK_DAYS = [
  { label: 'Jan 22', key: 'd22' },
  { label: 'Jan 23', key: 'd23' },
  { label: 'Jan 24', key: 'd24', today: true },
  { label: 'Jan 25', key: 'd25' },
  { label: 'Jan 26', key: 'd26' },
  { label: 'Jan 27', key: 'd27' },
  { label: 'Jan 28', key: 'd28' },
]

const SESSION_COLORS = [
  'bg-primary-100 text-primary-700 border-primary-200',
  'bg-sky-100 text-sky-700 border-sky-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-amber-100 text-amber-700 border-amber-200',
  'bg-purple-100 text-purple-700 border-purple-200',
]

function randomColor(seed) {
  return SESSION_COLORS[seed % SESSION_COLORS.length]
}

const subjects = ['Math G22', 'Physics', 'Data Sci', 'Algebra', 'Statistics', 'Calculus', 'Chem']

const scheduleData = Object.fromEntries(
  WEEK_DAYS.map(({ key }, di) => [
    key,
    Array.from({ length: 3 + (di % 3) }, (_, i) => ({
      time: `${8 + i * 2}:00 AM`,
      subject: subjects[(di + i) % subjects.length],
      students: 18 + ((di + i) * 7) % 20,
      color: randomColor(di + i),
    })),
  ])
)

const SUBJECTS_OPTS = ['All Subjects', 'Math', 'Physics', 'Data Science', 'Statistics']
const STATUS_OPTS = ['All Status', 'Active', 'Pending', 'Cancelled']
const DATE_OPTS = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year']

const Analytics = () => {
  const [subject, setSubject] = useState('All Subjects')
  const [status, setStatus] = useState('All Status')
  const [dateRange, setDateRange] = useState('Last 7 days')

  const resetFilters = () => {
    setSubject('All Subjects')
    setStatus('All Status')
    setDateRange('Last 7 days')
  }

  return (
    <PageAmbient variant="teacher">
    <PageScaffold
        title="PDF Reports"
        subtitle="Teaching activity, engagement, and weekly session overview"
        action={
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              CSV
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              XLS
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-400 text-white text-xs font-semibold hover:bg-primary-500 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </div>
        }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMetric label="Total Posts" value="1,248" icon={BookOpen} tone="primary" change="+8% this month" />
        <StatMetric label="Total Viewer" value="18,420" icon={Eye} tone="info" change="+14% this month" />
        <StatMetric label="Total Sessions" value="42,891" icon={Users} tone="success" />
        <StatMetric label="Avg / Per Week" value="8.8" icon={TrendingUp} tone="warning" />
      </div>

      <FilterBar
        fields={[
          { id: 'date', label: 'Date Range', value: dateRange, onChange: setDateRange, options: DATE_OPTS },
          { id: 'subject', label: 'Subject', value: subject, onChange: setSubject, options: SUBJECTS_OPTS },
          { id: 'status', label: 'Status', value: status, onChange: setStatus, options: STATUS_OPTS },
        ]}
        onReset={resetFilters}
      >
        <button
          type="button"
          className="px-4 py-2.5 rounded-lg bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors whitespace-nowrap"
        >
          Apply
        </button>
      </FilterBar>

      <PageCard padding={false} className="overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-bold text-slate-800 text-sm">Weekly Schedule</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            January 22 – January 28, 2026
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                {WEEK_DAYS.map(({ label, key, today }) => (
                  <th key={key} className="px-3 py-3 text-center">
                    <div
                      className={cn(
                        'inline-flex flex-col items-center px-3 py-1.5 rounded-xl',
                        today ? 'bg-primary-400 text-white' : 'text-slate-400'
                      )}
                    >
                      <span className={cn('text-xs font-semibold', today ? 'text-white' : 'text-slate-600')}>
                        {today ? `MON ${label.split(' ')[1]}` : label}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((rowIdx) => (
                <tr key={rowIdx} className="border-t border-slate-50">
                  {WEEK_DAYS.map(({ key, today }) => {
                    const cell = scheduleData[key]?.[rowIdx]
                    return (
                      <td key={key} className="px-2 py-2 align-top">
                        {cell ? (
                          <div
                            className={cn(
                              'rounded-xl border px-2.5 py-2 text-xs',
                              today ? 'bg-primary-50 border-primary-200' : cell.color
                            )}
                          >
                            <p className="font-semibold truncate">{cell.subject}</p>
                            <p className={cn('mt-0.5', today ? 'text-primary-500' : 'opacity-70')}>{cell.time}</p>
                            <p className={cn('mt-0.5 font-medium', today ? 'text-primary-600' : '')}>
                              {cell.students} students
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-slate-100 px-2.5 py-2 h-16" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
          {SESSION_COLORS.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-full border', c)} />
              <span className="text-xs text-slate-400">{subjects[i]}</span>
            </div>
          ))}
        </div>
      </PageCard>
    </PageScaffold>
    </PageAmbient>
  )
}

export default Analytics

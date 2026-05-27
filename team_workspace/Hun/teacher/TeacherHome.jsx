import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { cn } from '../../lib/utils'
import {
  PageCard,
  DataTable,
  StatMetric,
  AnimatedBackground,
  PageAmbient,
} from '../../components'

const PRIMARY = '#c07888'

const activityData = {
  Today: [
    { t: '8am', v: 120 }, { t: '10am', v: 480 }, { t: '12pm', v: 860 },
    { t: '2pm', v: 640 }, { t: '4pm', v: 920 }, { t: '6pm', v: 540 }, { t: '8pm', v: 210 },
  ],
  'Last 7 Days': [
    { t: 'Mon', v: 320 }, { t: 'Tue', v: 780 }, { t: 'Wed', v: 560 },
    { t: 'Thu', v: 940 }, { t: 'Fri', v: 1100 }, { t: 'Sat', v: 820 }, { t: 'Sun', v: 400 },
  ],
}

const subjectActivity = [
  { label: 'In-Progress', pct: 45, color: 'bg-primary-300' },
  { label: 'On-Time Class', pct: 25, color: 'bg-emerald-400' },
  { label: 'Not Started', pct: 10, color: 'bg-amber-400' },
  { label: 'Completed', pct: 20, color: 'bg-sky-400' },
]

const sessions = [
  { id: 1, date: 'Nov 20, 2025', time: '1:00 – 1:00 PM', subject: 'Math Grade 22', students: 25, status: 'Pending' },
  { id: 2, date: 'Nov 20, 2025', time: '2:00 – 3:00 PM', subject: 'Math Grade 22', students: 25, status: 'Waiting' },
  { id: 3, date: 'Nov 20, 2025', time: '4:00 – 5:00 PM', subject: 'Math Grade 22', students: 25, status: 'Active' },
  { id: 4, date: 'Nov 20, 2025', time: '5:00 – 6:00 PM', subject: 'Math Grade 22', students: 25, status: 'Cancelled' },
  { id: 5, date: 'Nov 20, 2025', time: '6:00 – 7:00 PM', subject: 'Math Grade 22', students: 25, status: 'Active' },
]

const STATUS_STYLES = {
  Active: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Waiting: 'bg-sky-50 text-sky-700',
  Cancelled: 'bg-red-50 text-red-600',
}

const TOTAL_RECORDS = 2684
const PAGE_SIZE = 5

const sessionColumns = [
  {
    key: 'task',
    label: 'Task / Start',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-800 text-xs">{row.date}</p>
        <p className="text-xs text-slate-400">{row.time}</p>
      </div>
    ),
  },
  { key: 'subject', label: 'Subject', render: (row) => <span className="text-xs font-medium">{row.subject}</span> },
  {
    key: 'students',
    label: 'Total Student',
    className: 'text-center',
    render: (row) => <span className="text-xs font-semibold">{row.students}</span>,
  },
  {
    key: 'status',
    label: 'Status',
    className: 'text-center',
    render: (row) => (
      <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', STATUS_STYLES[row.status])}>
        {row.status}
      </span>
    ),
  },
  {
    key: 'details',
    label: 'Details',
    className: 'text-center',
    render: () => (
      <button type="button" className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center mx-auto hover:bg-slate-100 transition-colors">
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
      </button>
    ),
  },
]

const TeacherHome = () => {
  const [period, setPeriod] = useState('Last 7 Days')
  const [page, setPage] = useState(1)

  return (
    <PageAmbient variant="teacher" className="space-y-5">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 text-white px-5 py-4">
        <AnimatedBackground variant="teacher" intensity="soft" breathe />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Teacher dashboard</p>
          <h1 className="text-xl font-bold mt-0.5">Your teaching hub</h1>
          <p className="text-sm text-slate-300 mt-1">Sessions, students, and activity at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMetric label="Total Sessions" value="2,684" tone="primary" />
        <StatMetric label="Active Students" value="88" tone="success" />
        <StatMetric label="Avg Rating" value="4.9 ★" tone="warning" />
        <StatMetric label="This Week" value="+12%" change="+12% vs last week" tone="info" />
      </div>

      <PageCard padding={false} className="overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pb-3">
          <h2 className="font-bold text-slate-800 text-base">
            User Activity ({period === 'Today' ? 'Today' : 'Last 7 Days'})
          </h2>
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg self-start sm:self-auto">
            {['Today', 'Last 7 Days'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  period === p ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="flex-1 px-5 pb-5">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={activityData[period]} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  name="Activity"
                  stroke={PRIMARY}
                  strokeWidth={2.5}
                  fill="url(#actGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: PRIMARY }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:w-56 p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Activity by Subject</h3>
            <div className="space-y-4">
              {subjectActivity.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-600">{item.label}</span>
                    <span className="text-xs font-semibold text-slate-800">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', item.color)} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageCard>

      <div>
        <h2 className="font-bold text-slate-800 text-base mb-3 px-1">Sessions</h2>
        <DataTable
          columns={sessionColumns}
          rows={sessions}
          page={page}
          pageSize={PAGE_SIZE}
          total={TOTAL_RECORDS}
          onPageChange={setPage}
        />
      </div>
    </PageAmbient>
  )
}

export default TeacherHome

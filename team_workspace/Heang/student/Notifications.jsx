import { useState } from 'react'
import { Bell, Calendar, BookOpen, FileText, BarChart2, Check, Settings, Star, Gift } from 'lucide-react'
import { useAuth } from '@/hooks'
import { PageScaffold, PageCard, TabBar, NotificationItem, PageAmbient } from '@/components'
import { useTranslation } from '@/i18n'

const allNotifications = [
  {
    id: '1',
    icon: Calendar,
    iconBg: 'bg-primary-100 text-primary-600',
    title: 'Dr. Sarah Jenkins posted a new teaching schedule',
    body: 'Grade 11 Mathematics schedule has been updated with new consolidation hours and homework deadlines.',
    time: '45 mins ago',
    read: false,
    important: true,
    primary: 'View Schedule',
  },
  {
    id: '2',
    icon: BookOpen,
    iconBg: 'bg-sky-100 text-sky-600',
    title: 'New session added: Physics 101 with Prof. Michael Chen',
    body: 'A supplementary Quantum Mechanics session has been scheduled for today at 03:00 PM in Lab 8.',
    time: '2 hours ago',
    read: false,
    important: true,
    primary: 'View Session',
  },
  {
    id: '3',
    icon: FileText,
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: 'New Learning Materials: Organic Chemistry',
    body: 'Prof. Elena Rodriguez has uploaded lecture slides and practice problems for Chapter 12.',
    time: 'Yesterday',
    read: false,
    important: false,
    primary: 'Download PDF',
  },
  {
    id: '4',
    icon: BarChart2,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Quiz Results Available: Macroeconomics',
    body: "Your Unit 4 quiz results have been published. Check your score and review the teacher's feedback.",
    time: '2 days ago',
    read: true,
    important: false,
    primary: 'View Results',
  },
  {
    id: '5',
    icon: Star,
    iconBg: 'bg-violet-100 text-violet-600',
    title: 'Leave a review for your session with Dr. James Wilson',
    body: 'How was your Physics session? Your feedback helps other students find the right teacher.',
    time: '3 days ago',
    read: true,
    important: false,
    primary: 'Leave Review',
  },
  {
    id: '6',
    icon: Gift,
    iconBg: 'bg-primary-50 text-primary-600',
    title: 'Special offer: 20% off your next 3 sessions',
    body: 'This limited offer expires in 48 hours. Book now to secure your discount with any verified teacher.',
    time: '4 days ago',
    read: true,
    important: true,
    primary: 'Claim Offer',
  },
]

const Notifications = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const firstName = user?.name?.split(' ')[0] || 'there'

  const FILTER_TABS = [
    { id: 'all', label: t('notifications.all') },
    { id: 'unread', label: t('notifications.unread') },
    { id: 'important', label: t('notifications.important') },
  ]
  const [items, setItems] = useState(allNotifications)
  const [filter, setFilter] = useState('all')

  const unread = items.filter((n) => !n.read).length
  const markAll = () => setItems((p) => p.map((n) => ({ ...n, read: true })))
  const dismiss = (id) => setItems((p) => p.filter((n) => n.id !== id))
  const markRead = (id) => setItems((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const displayed = items.filter((n) => {
    if (filter === 'unread') return !n.read
    if (filter === 'important') return n.important
    return true
  })

  return (
    <PageAmbient variant="notifications">
    <PageScaffold
        title={t('notifications.title')}
        subtitle={
          unread > 0
            ? t('notifications.unreadSubtitle').replace('{{count}}', unread)
            : t('notifications.caughtUp').replace('{{name}}', firstName)
        }
        action={
          unread > 0 ? (
            <button
              type="button"
              onClick={markAll}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              {t('notifications.markAllRead')}
            </button>
          ) : null
        }
    >
      <PageCard padding={false} className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-500" />
            <span className="font-semibold text-slate-800 text-sm">{t('notifications.inbox')}</span>
            {unread > 0 && (
              <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                {unread}
              </span>
            )}
          </div>
          <button type="button" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors" aria-label="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50">
          <TabBar tabs={FILTER_TABS} active={filter} onChange={setFilter} />
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-16 px-5">
            <Bell className="w-10 h-10 mx-auto mb-3 text-slate-200" />
            <p className="text-sm font-medium text-slate-500">{t('notifications.empty')}</p>
            <p className="text-xs text-slate-400 mt-1">{t('notifications.emptyHint')}</p>
          </div>
        ) : (
          <div>
            {displayed.map((n) => (
              <NotificationItem
                key={n.id}
                icon={n.icon}
                iconBg={n.iconBg}
                title={n.title}
                body={n.body}
                time={n.time}
                read={n.read}
                primaryAction={n.primary}
                onPrimary={() => markRead(n.id)}
                onDismiss={() => dismiss(n.id)}
              />
            ))}
          </div>
        )}
      </PageCard>
    </PageScaffold>
    </PageAmbient>
  )
}

export default Notifications
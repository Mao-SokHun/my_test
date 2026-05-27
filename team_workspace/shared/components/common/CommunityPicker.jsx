import { useMemo, useState } from 'react'
import { CheckCircle2, Users } from 'lucide-react'
import clsx from 'clsx'
import {
  majorCommunities,
  subjectCommunities,
  filterCommunities,
} from '../../constants/communities'

/**
 * Major / subject community grid (create post, modals).
 * @param {'select'|'navigate'} mode — select highlights one; navigate calls onSelect immediately
 * @param {boolean} fill — use flex-1 scroll (parent must be flex flex-col min-h-0)
 */
const CommunityPicker = ({
  value,
  onChange,
  onSelect,
  mode = 'select',
  className,
  fill = false,
  maxHeight,
}) => {
  const [tab, setTab] = useState('major')
  const [search, setSearch] = useState('')

  const list = useMemo(() => {
    const base = tab === 'major' ? majorCommunities : subjectCommunities
    return filterCommunities(base, search)
  }, [tab, search])

  const handlePick = (id) => {
    onChange?.(id)
    if (mode === 'navigate') onSelect?.(id)
  }

  const scrollClass = fill
    ? 'flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-hide'
    : clsx(
        'overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-hide',
        maxHeight ?? 'max-h-[min(28rem,55vh)]'
      )

  return (
    <div className={clsx('flex flex-col min-w-0 min-h-0', className)}>
      <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center mb-4 min-w-0">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'major', label: 'Majors' },
            { id: 'subject', label: 'Subjects' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors',
                tab === t.id
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'glass-ios-pill text-slate-600 hover:text-slate-800'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === 'major' ? 'Search majors…' : 'Search subjects…'}
          className="w-full sm:flex-1 sm:min-w-0 sm:max-w-xs text-xs glass-input rounded-lg px-3 py-2"
        />
      </div>

      <div className={scrollClass}>
        {list.length === 0 ? (
          <p className="text-sm text-slate-500 py-10 text-center">No communities match your search.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 w-full min-w-0">
            {list.map((c) => {
              const isSelected = value === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handlePick(c.id)}
                  className={clsx(
                    'relative w-full min-w-0 rounded-xl p-3 text-left border transition-colors duration-200',
                    'hover:border-primary-200 hover:bg-white/55 hover:shadow-sm',
                    isSelected
                      ? 'border-primary-400 bg-primary-50/80 shadow-sm'
                      : 'border-slate-200/80 bg-white/50 glass-panel'
                  )}
                >
                  {isSelected && mode === 'select' && (
                    <CheckCircle2 className="absolute top-2.5 right-2.5 w-4 h-4 text-primary-600" />
                  )}
                  <div className="flex items-start gap-2.5 min-w-0 pr-5">
                    <div
                      className={clsx(
                        'w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold bg-gradient-to-br',
                        c.badgeGradient
                      )}
                    >
                      {c.short}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">{c.label}</p>
                      <p className="flex items-center gap-1 text-[10px] text-slate-600 mt-1 font-medium">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{c.members}</span>
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunityPicker

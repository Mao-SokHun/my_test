import clsx from 'clsx'

const SubjectTabs = ({ tabs, active, onChange, className }) => (
  <div className={clsx('flex items-center gap-3 sm:gap-3.5 overflow-x-auto py-1 scrollbar-hide', className)}>
    {tabs.map((tab) => (
      <button
        key={tab}
        type="button"
        onClick={() => onChange(tab)}
        className={clsx(
          'flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all',
          active === tab
            ? 'bg-primary-500 text-white'
            : 'glass-subtle border border-white/50 text-slate-600 hover:border-primary-200 hover:text-primary-600'
        )}
      >
        {tab}
      </button>
    ))}
  </div>
)

export default SubjectTabs

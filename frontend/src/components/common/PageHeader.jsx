import clsx from 'clsx'

const PageHeader = ({ title, subtitle, action, className }) => (
  <div className={clsx('flex items-start justify-between gap-4 flex-wrap', className)}>
    <div>
      {title && <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>}
      {subtitle && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
)

export default PageHeader

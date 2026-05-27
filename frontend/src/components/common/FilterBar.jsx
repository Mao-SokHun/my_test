import clsx from 'clsx'
import { RotateCcw } from 'lucide-react'
import Select from '../ui/Select'
import { useTranslation } from '@/i18n'

/** Generic filter row (dropdown fields + reset). Used by SearchFilter. */
const FilterBar = ({ fields = [], onReset, className, children }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx('glass-panel glass-liquid p-5 sm:p-6 overflow-visible', className)}>
      <div className="flex flex-wrap items-end gap-4 sm:gap-5">
        {fields.map((field) => (
          <div key={field.id} className={clsx('flex-1', field.minWidth ?? 'min-w-[160px]')}>
            <label className="label-field text-slate-600 mb-2">
              {field.label}
            </label>
            <Select
              size="sm"
              placement="bottom"
              value={field.value}
              onChange={field.onChange}
              options={field.options}
              menuMinWidth={field.menuMinWidth ?? 240}
              menuMaxHeight={260}
            />
          </div>
        ))}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 ml-1 sm:ml-2 text-sm font-semibold text-slate-700 glass-ios-pill rounded-xl hover:text-primary-700 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('filters.reset')}
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default FilterBar

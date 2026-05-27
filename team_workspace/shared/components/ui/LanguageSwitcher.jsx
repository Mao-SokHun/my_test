import clsx from 'clsx'
import { Globe } from 'lucide-react'
import { useTranslation } from '@/i18n'

/**
 * EN / ខ្មែរ segmented switch — iOS liquid glass style with sliding thumb.
 * @param {'sm'|'md'} size
 * @param {boolean} showIcon — globe icon (default true)
 * @param {'pill'|'inline'} variant — pill for navbar, inline for settings panel
 */
const LanguageSwitcher = ({
  className,
  size = 'sm',
  showIcon = true,
  variant = 'pill',
}) => {
  const { lang, setLang } = useTranslation()

  const options = [
    { code: 'en', label: 'EN' },
    { code: 'km', label: 'ខ្មែរ' },
  ]

  return (
    <div
      className={clsx(
        'glass-lang-switch',
        size === 'md' && 'glass-lang-switch--md',
        variant === 'inline' && 'glass-lang-switch--inline',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {showIcon && (
        <span className="glass-lang-switch-icon" aria-hidden>
          <Globe className="w-3.5 h-3.5" strokeWidth={2.25} />
        </span>
      )}

      <div className="glass-lang-switch-track">
        <span
          className="glass-lang-switch-thumb"
          aria-hidden
          style={{ transform: lang === 'km' ? 'translateX(100%)' : 'translateX(0)' }}
        />
        {options.map(({ code, label }) => {
          const active = lang === code
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={clsx(
                'glass-lang-switch-btn',
                active && 'glass-lang-switch-btn--active',
                code === 'km' && 'font-khmer'
              )}
              aria-pressed={active}
              aria-label={code === 'en' ? 'English' : 'Khmer'}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSwitcher

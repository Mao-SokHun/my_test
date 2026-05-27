import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(({ label, error, hint, leftIcon, rightIcon, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent',
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-200 hover:border-slate-300',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input

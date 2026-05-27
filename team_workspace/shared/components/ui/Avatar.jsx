import clsx from 'clsx'

const sizeClasses = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
  '2xl': 'w-28 h-28 text-3xl',
}

const dotSizes = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
}

const gradients = [
  'from-slate-300 to-slate-400',
  'from-primary-200 to-primary-300',
  'from-sky-200 to-sky-300',
  'from-emerald-200 to-emerald-300',
  'from-amber-200 to-amber-300',
]

const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

const Avatar = ({ src, name = '', size = 'md', online, className }) => {
  const gradientIndex = name.charCodeAt(0) % gradients.length
  const gradient = gradients[gradientIndex]

  return (
    <div className={clsx('relative flex-shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx('rounded-2xl object-cover ring-2 ring-white shadow-sm', sizeClasses[size])}
        />
      ) : (
        <div
          className={clsx(
            'rounded-2xl flex items-center justify-center font-semibold text-slate-600 bg-gradient-to-br shadow-sm ring-2 ring-white',
            gradient,
            sizeClasses[size]
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {online !== undefined && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            dotSizes[size],
            online ? 'bg-emerald-400' : 'bg-slate-300'
          )}
        />
      )}
    </div>
  )
}

export default Avatar
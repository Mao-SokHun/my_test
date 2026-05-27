import clsx from 'clsx'

const ColorOverlay = ({ color = 'primary', opacity = 0.1, className }) => (
  <div
    className={clsx('absolute inset-0 pointer-events-none', className)}
    style={{ backgroundColor: `var(--color-${color})`, opacity }}
  />
)

export default ColorOverlay

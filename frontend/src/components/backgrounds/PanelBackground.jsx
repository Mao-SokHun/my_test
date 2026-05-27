import clsx from 'clsx'
import GalaxyBackground from './GalaxyBackground'

/**
 * Admin dashboard — stars, nebula, and drifting planets behind glass.
 */
const AdminPanelBackground = ({ className }) => (
  <div
    className={clsx(
      'pointer-events-none absolute inset-0 w-full h-full min-h-[200px] overflow-hidden admin-panel-root',
      className
    )}
    aria-hidden
  >
    <GalaxyBackground />
  </div>
)

export default AdminPanelBackground

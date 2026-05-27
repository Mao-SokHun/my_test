import clsx from 'clsx'

/** Floating glass orbs — slate / pearl / soft rose (no blue) */
const ORBS = [
  {
    id: 'b1',
    className: 'admin-flow-orb--pearl',
    style: { top: '5%', left: '6%', width: 'min(22vw, 12rem)', height: 'min(22vw, 12rem)' },
    drift: 'admin-flow-drift-a',
  },
  {
    id: 'b2',
    className: 'admin-flow-orb--slate',
    style: { top: '14%', right: '4%', width: 'min(34vw, 18rem)', height: 'min(34vw, 18rem)' },
    drift: 'admin-flow-drift-b',
  },
  {
    id: 'b3',
    className: 'admin-flow-orb--mauve',
    style: { top: '46%', left: '18%', width: 'min(24vw, 11rem)', height: 'min(24vw, 11rem)' },
    drift: 'admin-flow-drift-c',
  },
  {
    id: 'b4',
    className: 'admin-flow-orb--rose',
    style: { bottom: '12%', right: '14%', width: 'min(28vw, 14rem)', height: 'min(28vw, 14rem)' },
    drift: 'admin-flow-drift-d',
  },
  {
    id: 'b5',
    className: 'admin-flow-orb--warm',
    style: { bottom: '6%', left: '8%', width: 'min(38vw, 20rem)', height: 'min(38vw, 20rem)' },
    drift: 'admin-flow-drift-e',
  },
  {
    id: 'b6',
    className: 'admin-flow-orb--fog',
    style: { top: '30%', right: '26%', width: 'min(18vw, 9rem)', height: 'min(18vw, 9rem)' },
    drift: 'admin-flow-drift-f',
  },
]

/**
 * Admin ambient — soft drifting orbs (bokeh style), no mesh or cyan.
 */
const AdminFlowAmbient = ({ className }) => (
  <div
    className={clsx('admin-flow-layer absolute inset-0 overflow-hidden pointer-events-none', className)}
    aria-hidden
  >
    <div className="admin-flow-orbs">
      {ORBS.map((o) => (
        <div
          key={o.id}
          className={clsx('admin-flow-orb', o.className, o.drift)}
          style={o.style}
        />
      ))}
    </div>
  </div>
)

export default AdminFlowAmbient

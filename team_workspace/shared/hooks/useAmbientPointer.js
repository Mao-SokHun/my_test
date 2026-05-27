import { useCallback, useRef, useState } from 'react'

const NEUTRAL_VARS = {
  '--ambient-px': '0.5',
  '--ambient-py': '0.5',
  '--ambient-shift-x': '0',
  '--ambient-shift-y': '0',
}

/**
 * Tracks pointer over app shell → CSS vars for ambient parallax / hover boost.
 * Use on layout root (student AppLayout, admin AdminLayout).
 */
export function useAmbientPointer() {
  const leaveTimer = useRef(null)
  const [active, setActive] = useState(false)
  const [style, setStyle] = useState(NEUTRAL_VARS)

  const applyPoint = useCallback((clientX, clientY, el) => {
    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
    setStyle({
      '--ambient-px': String(px),
      '--ambient-py': String(py),
      '--ambient-shift-x': String((px - 0.5) * 2),
      '--ambient-shift-y': String((py - 0.5) * 2),
    })
    setActive(true)
  }, [])

  const onMouseMove = useCallback(
    (e) => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current)
        leaveTimer.current = null
      }
      applyPoint(e.clientX, e.clientY, e.currentTarget)
    },
    [applyPoint]
  )

  const onMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActive(false)
      setStyle(NEUTRAL_VARS)
      leaveTimer.current = null
    }, 150)
  }, [])

  return {
    ambientActive: active,
    ambientShellProps: {
      onMouseMove,
      onMouseLeave,
      style,
      className: active ? 'ambient-pointer-active' : undefined,
    },
  }
}

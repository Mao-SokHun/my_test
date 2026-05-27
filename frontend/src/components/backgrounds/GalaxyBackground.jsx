import clsx from 'clsx'

const PLANETS = [
  {
    id: 'p1',
    className: 'student-galaxy-planet--rose',
    style: { top: '10%', right: '6%', width: 'min(26vw, 8.5rem)', height: 'min(26vw, 8.5rem)' },
    drift: 'student-galaxy-drift-a',
    ring: true,
    duration: '28s',
  },
  {
    id: 'p2',
    className: 'student-galaxy-planet--violet',
    style: { bottom: '18%', left: '4%', width: 'min(22vw, 7rem)', height: 'min(22vw, 7rem)' },
    drift: 'student-galaxy-drift-b',
    duration: '34s',
  },
  {
    id: 'p3',
    className: 'student-galaxy-planet--blush',
    style: { top: '42%', left: '22%', width: 'min(16vw, 5rem)', height: 'min(16vw, 5rem)' },
    drift: 'student-galaxy-drift-c',
    duration: '22s',
  },
  {
    id: 'p4',
    className: 'student-galaxy-planet--slate',
    style: { top: '22%', right: '28%', width: 'min(14vw, 4.5rem)', height: 'min(14vw, 4.5rem)' },
    drift: 'student-galaxy-drift-d',
    duration: '26s',
  },
  {
    id: 'p5',
    className: 'student-galaxy-planet--mist',
    style: { bottom: '8%', right: '12%', width: 'min(20vw, 6.5rem)', height: 'min(20vw, 6.5rem)' },
    drift: 'student-galaxy-drift-e',
    duration: '30s',
  },
]

function buildStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${((i * 37 + 11) % 88) + 6}%`,
    left: `${((i * 53 + 19) % 88) + 6}%`,
    size: (i % 3) + 1,
    delay: `${(i % 8) * 0.45}s`,
    duration: `${2.5 + (i % 5) * 0.6}s`,
  }))
}

function buildShootingStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${((i * 41 + 8) % 70) + 5}%`,
    left: `${((i * 67 + 13) % 80) + 10}%`,
    delay: `${i * 4.2 + 2}s`,
    duration: `${3 + (i % 3)}s`,
  }))
}

/**
 * Star field + nebula + orbiting planets (shared galaxy visuals).
 */
const GalaxyBackground = ({ compact = false, className }) => {
  const stars = buildStars(compact ? 48 : 96)
  const shooting = buildShootingStars(compact ? 2 : 4)
  const planets = compact ? PLANETS.slice(0, 3) : PLANETS

  return (
    <div
      className={clsx(
        'absolute inset-0 w-full h-full overflow-hidden student-galaxy-root',
        compact && 'student-galaxy--compact',
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 student-galaxy-sky" />

      <div className="student-galaxy-nebula student-galaxy-nebula--a" />
      <div className="student-galaxy-nebula student-galaxy-nebula--b" />
      <div className="student-galaxy-nebula student-galaxy-nebula--c" />

      <div className="student-galaxy-planets">
        {planets.map((p) => (
          <div
            key={p.id}
            className={clsx('student-galaxy-planet', p.className, p.drift)}
            style={{ ...p.style, animationDuration: p.duration }}
          >
            {p.ring && <span className="student-galaxy-planet-ring" aria-hidden />}
          </div>
        ))}
      </div>

      <div className="student-galaxy-stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="student-galaxy-star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {shooting.map((s) => (
        <span
          key={s.id}
          className="student-galaxy-shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      <div className="absolute inset-0 student-galaxy-vignette" />
    </div>
  )
}

export default GalaxyBackground

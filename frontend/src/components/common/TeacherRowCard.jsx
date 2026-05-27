import { Link } from 'react-router-dom'
import { MapPin, Star, CheckCircle } from 'lucide-react'
import clsx from 'clsx'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

const TeacherRowCard = ({ teacher, className }) => {
  const {
    id,
    name,
    title,
    subjects = [],
    rating = 0,
    reviewCount = 0,
    students = 0,
    location,
    verified,
    online,
    price,
    avatarUrl,
  } = teacher

  return (
    <Link
      to={`/teacher/${id}`}
      className={clsx(
        'group glass-panel-hover flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all',
        className
      )}
    >
      <Avatar src={avatarUrl} name={name} size="lg" online={online} className="flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-semibold text-slate-800 truncate group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          {verified && <CheckCircle className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />}
        </div>
        {title && <p className="text-xs text-slate-500 truncate">{title}</p>}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {subjects.slice(0, 3).map((s) => (
            <Badge key={s} variant="primary" size="sm">{s}</Badge>
          ))}
          {subjects.length > 3 && (
            <Badge variant="neutral" size="sm">+{subjects.length - 3}</Badge>
          )}
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 flex-shrink-0">
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {location}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)} ({reviewCount})
        </span>
      </div>

      {price && (
        <div className="text-right flex-shrink-0">
          <span className="text-base font-bold text-primary-700">${price}</span>
          <span className="text-[10px] text-slate-400 block">/hr</span>
        </div>
      )}
    </Link>
  )
}

export default TeacherRowCard

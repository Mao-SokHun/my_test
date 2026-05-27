import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle, MapPin, Clock, Globe, BookOpen, Star,
  MessageCircle, Award, Calendar, GraduationCap, Users, Zap
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import StarRating from '../../components/ui/StarRating'
import { teachers } from '@/constants/mockData'
import { PageCard, TabBar } from '@/components'
import clsx from 'clsx'

const reviews = [
  { author: 'Sokha D.', rating: 5, time: '2 weeks ago', text: 'Absolutely incredible teacher! Explains complex concepts with clarity and patience. Highly recommend!' },
  { author: 'Bopha K.', rating: 5, time: '1 month ago', text: 'My grades improved dramatically after just 4 sessions. The personalized approach makes all the difference.' },
  { author: 'Dara C.', rating: 4, time: '1 month ago', text: 'Very knowledgeable and engaging. Sometimes goes too fast but always happy to revisit topics.' },
]

const credentials = [
  { icon: GraduationCap, text: 'M.Sc in Applied Mathematics', sub: 'Royal University of Phnom Penh, 2016' },
  { icon: Award, text: 'Certified Instructor', sub: 'Ministry of Education, Cambodia' },
  { icon: BookOpen, text: 'Published Author', sub: '3 academic papers in data science' },
]

const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

const TeacherDetail = () => {
  const { id } = useParams()
  const teacher = teachers.find((t) => t.id === id) || teachers[1]
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [tab, setTab] = useState('biography')

  const tabs = [
    { id: 'biography', label: 'Biography' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'availability', label: 'Availability' },
    { id: 'reviews', label: `Reviews (${teacher.reviewCount})` },
  ]

  return (
    <div className="space-y-5">
      <Link
        to="/home"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Teachers
      </Link>

      <PageCard padding={false} className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary-400 to-primary-500 relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="px-6 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl ring-4 ring-white shadow-lg overflow-hidden bg-gradient-to-br from-primary-300 to-primary-400 flex items-center justify-center text-2xl font-bold text-white">
                {teacher.name.charAt(0)}
              </div>
              {teacher.online && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div className="flex gap-2 mb-1">
              <Link to="/messages">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:border-primary-200 hover:text-primary-600 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Message
                </button>
              </Link>
              <Link to={`/book/${teacher.id}`}>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Session
                </button>
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-800">{teacher.name}</h1>
              {teacher.verified && (
                <span className="flex items-center gap-0.5 px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-bold rounded-full">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{teacher.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary-500" />
                {teacher.location}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-primary-500" />
                Khmer, English
              </div>
              <StarRating rating={teacher.rating} showValue size="sm" count={teacher.reviewCount} />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {teacher.subjects.map((s) => (
              <Badge key={s} variant="primary" size="sm">
                {s}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Zap, value: teacher.experience || '8+', label: 'Years Teaching', color: 'bg-primary-50 text-primary-600' },
              { icon: Users, value: teacher.students?.toLocaleString() || '1.2K', label: 'Students', color: 'bg-sky-50 text-sky-600' },
              { icon: Star, value: teacher.rating, label: 'Average Rating', color: 'bg-amber-50 text-amber-600' },
            ].map((s) => (
              <div key={s.label} className={clsx('rounded-xl p-3 text-center', s.color.split(' ')[0])}>
                <p className={clsx('text-xl font-bold leading-none', s.color.split(' ')[1])}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </PageCard>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <TabBar tabs={tabs} active={tab} onChange={setTab} />

          {tab === 'biography' && (
            <PageCard>
              <h2 className="font-bold text-slate-800 mb-3">Professional Biography</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{teacher.bio}</p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                With a passion for project-based learning, {teacher.name.split(' ')[0]} teaches using real-world
                examples and cutting-edge tools. Students consistently rate their sessions as highly engaging
                and results-driven.
              </p>
              <div className="mt-5 p-4 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs font-semibold text-primary-700 mb-1">Teaching Philosophy</p>
                <p className="text-sm text-primary-600 leading-relaxed italic">
                  &ldquo;Every student learns differently. My goal is to find the unique method that unlocks each
                  student&apos;s potential.&rdquo;
                </p>
              </div>
            </PageCard>
          )}

          {tab === 'credentials' && (
            <PageCard>
              <h2 className="font-bold text-slate-800 mb-4">Credentials &amp; Qualifications</h2>
              <div className="space-y-4">
                {credentials.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4.5 h-4.5 text-primary-600" style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{c.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PageCard>
          )}

          {tab === 'availability' && (
            <PageCard>
              <h2 className="font-bold text-slate-800 mb-1">Available Time Slots</h2>
              <p className="text-xs text-slate-400 mb-4">Select a slot to proceed with booking</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={clsx(
                      'py-2.5 rounded-xl text-xs font-semibold border transition-all',
                      selectedSlot === slot
                        ? 'bg-primary-500 text-white border-primary-400 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600'
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {selectedSlot ? (
                <Link to={`/book/${teacher.id}`}>
                  <button
                    type="button"
                    className="w-full py-2.5 bg-primary-500 text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
                  >
                    Book {selectedSlot} — ${teacher.price}/hr
                  </button>
                </Link>
              ) : (
                <p className="text-center text-xs text-slate-400">Pick a time slot above to continue</p>
              )}
            </PageCard>
          )}

          {tab === 'reviews' && (
            <PageCard>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-800">Student Reviews</h2>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{teacher.rating}</span>
                  <span className="text-xs text-slate-400">({teacher.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="space-y-5">
                {reviews.map((r, i) => (
                  <div key={i} className={clsx('pb-5', i < reviews.length - 1 && 'border-b border-slate-50')}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                          {r.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{r.author}</p>
                          <StarRating rating={r.rating} size="sm" />
                        </div>
                      </div>
                      <span className="text-xs text-slate-300">{r.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </PageCard>
          )}
        </div>

        <div className="space-y-4">
          <PageCard>
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-3xl font-bold text-primary-600">${teacher.price}</p>
              <span className="text-sm text-slate-400">/session</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">60-minute private session</p>

            <div className="space-y-2.5 text-xs text-slate-600 mb-5">
              {[
                { icon: Clock, text: '1–2 hour sessions available' },
                { icon: Globe, text: 'Online via video call (Zoom/Meet)' },
                { icon: BookOpen, text: teacher.subjects.join(', ') },
                { icon: CheckCircle, text: 'Free 15-min intro call' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <Link to={`/book/${teacher.id}`}>
              <button
                type="button"
                className="w-full py-2.5 bg-primary-500 text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-sm mb-2.5"
              >
                Book Session
              </button>
            </Link>
            <Link to="/messages">
              <button
                type="button"
                className="w-full py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:border-primary-200 hover:text-primary-600 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 inline mr-1.5" />
                Send Message
              </button>
            </Link>
          </PageCard>

          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Contact Info</h3>
            <div className="space-y-2.5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary-500" />
                {teacher.location}, Cambodia
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-primary-500" />
                Khmer &amp; English
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Member since</span>
              <span className="font-medium text-slate-500">May 2023</span>
            </div>
          </PageCard>

          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-3">Rating Breakdown</h3>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-4xl font-bold text-slate-800">{teacher.rating}</p>
              <div>
                <StarRating rating={teacher.rating} />
                <p className="text-xs text-slate-400 mt-0.5">{teacher.reviewCount} reviews</p>
              </div>
            </div>
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-slate-400 w-3">{n}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-amber-400 h-1.5 rounded-full"
                    style={{ width: `${n === 5 ? 70 : n === 4 ? 20 : n === 3 ? 7 : 2}%` }}
                  />
                </div>
              </div>
            ))}
          </PageCard>
        </div>
      </div>
    </div>
  )
}

export default TeacherDetail

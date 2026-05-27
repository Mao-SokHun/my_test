import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Users, MessageSquare, Plus, Bell, BellOff, ChevronLeft, Star, Trophy,
  Calendar, Hash,
} from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import {
  PageCard,
  TabBar,
  CommunityPostCard,
  CommunityPostComposer,
  PageAmbient,
} from '@/components'
import clsx from 'clsx'

const community = {
  id: 1,
  name: 'Mathematics Hub',
  description: 'A vibrant community for math enthusiasts, students, and educators. Discuss problems, share resources, and grow together.',
  icon: '📐',
  members: 2340,
  posts: 156,
  online: 48,
  category: 'STEM',
  joined: true,
  color: 'from-primary-400 to-primary-500',
  rules: ['Be respectful to all members', 'Share relevant content only', 'Cite your sources for proofs', 'No homework shortcuts — guide, don\'t solve', 'Tag posts with the right topic'],
}

const posts = [
  { id: 1, author: 'Sokha Dara', authorRole: 'Student', time: '10 min ago', content: 'Just proved the Fundamental Theorem of Calculus from scratch! Feedback welcome.', likes: 42, comments: 18, liked: false },
  { id: 2, author: 'Dr. Sarah Jenkins', authorRole: 'Teacher', time: '1 hr ago', content: 'Great resource for Linear Algebra: Gilbert Strang MIT OCW lectures are world-class.', likes: 87, comments: 31, liked: true },
  { id: 3, author: 'Bopha Keo', authorRole: 'Student', time: '3 hrs ago', content: 'Struggling with the chain rule — does anyone have a good visual explanation?', likes: 23, comments: 44, liked: false },
  { id: 4, author: 'Visal Roth', authorRole: 'Student', time: '5 hrs ago', content: 'Weekly challenge: Find a closed-form for the sum of 1/n². Hint: it involves π.', likes: 134, comments: 67, liked: false },
]

const members = [
  { name: 'Dr. Sarah Jenkins', role: 'Teacher', tag: 'Moderator', online: true },
  { name: 'Sokha Dara', role: 'Student', tag: 'Top Contributor', online: true },
  { name: 'Visal Roth', role: 'Student', tag: 'Member', online: false },
  { name: 'Bopha Keo', role: 'Student', tag: 'Member', online: true },
]

const events = [
  { title: 'Weekly Math Challenge', date: 'Every Friday', time: '8:00 PM', participants: 234 },
  { title: 'Live Q&A: Exam Prep', date: 'May 24, 2026', time: '3:00 PM', participants: 89 },
]

const CommunityDetail = () => {
  useParams()
  const [tab, setTab] = useState('posts')
  const [joined, setJoined] = useState(community.joined)
  const [notified, setNotified] = useState(true)
  const [postText, setPostText] = useState('')
  const [likedPosts, setLikedPosts] = useState(() =>
    Object.fromEntries(posts.map((p) => [p.id, p.liked]))
  )

  const toggleLike = (id) => setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <PageAmbient variant="community">
      <PageCard padding={false} className={clsx('overflow-hidden border-0 bg-gradient-to-br text-white mb-6', community.color)}>
        <div className="p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none z-[1]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-20 -translate-y-20" />
          </div>
          <Link to="/community" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors relative z-10">
            <ChevronLeft className="w-3.5 h-3.5" />Back to communities
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <span className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">{community.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black">{community.name}</h1>
                  <Badge variant="info" size="sm">{community.category}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mt-1">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{community.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-full" />{community.online} online</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{community.posts} posts</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setNotified(!notified)} className="p-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                {notified ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </button>
              <Button variant={joined ? 'secondary' : 'primary'} size="sm" onClick={() => setJoined(!joined)}
                className={joined ? 'bg-white/20 text-white border-white/30 hover:bg-white/30' : ''}>
                {joined ? 'Joined ✓' : <><Plus className="w-4 h-4" />Join</>}
              </Button>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-4 max-w-xl relative">{community.description}</p>
        </div>
      </PageCard>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <TabBar tabs={[{ id: 'posts', label: 'Posts' }, { id: 'resources', label: 'Resources' }, { id: 'members', label: 'Members' }, { id: 'events', label: 'Events' }]} active={tab} onChange={setTab} />

          {tab === 'posts' && (
            <div className="space-y-4">
              {joined && (
                <CommunityPostComposer userName="You" value={postText} onChange={setPostText} onPost={() => setPostText('')} />
              )}
              {posts.map((post) => (
                <CommunityPostCard
                  key={post.id}
                  post={post}
                  liked={likedPosts[post.id]}
                  onLike={() => toggleLike(post.id)}
                  onShare={() => {}}
                />
              ))}
            </div>
          )}

          {tab === 'resources' && (
            <PageCard>
              <h3 className="font-bold text-slate-800 mb-4">Community Resources</h3>
              <div className="space-y-3">
                {[
                  { title: 'MIT Linear Algebra — Lecture Notes', type: 'PDF', author: 'Dr. Sarah Jenkins', stars: 87 },
                  { title: 'Calculus Cheat Sheet', type: 'PDF', author: 'Sokha Dara', stars: 124 },
                  { title: '3Blue1Brown — Essence of Calculus', type: 'Link', author: 'Visal Roth', stars: 201 },
                ].map((r) => (
                  <div key={r.title} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className={clsx('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold', r.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600')}>{r.type}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">{r.title}</p>
                      <p className="text-xs text-slate-400">by {r.author}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-amber-500"><Star className="w-3.5 h-3.5 fill-current" />{r.stars}</span>
                  </div>
                ))}
              </div>
            </PageCard>
          )}

          {tab === 'members' && (
            <PageCard>
              <Input placeholder="Search members..." className="mb-4" />
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size="sm" online={m.online} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.role}</p>
                      </div>
                    </div>
                    {m.tag === 'Moderator' && <Badge variant="warning" size="sm">Mod</Badge>}
                  </div>
                ))}
              </div>
            </PageCard>
          )}

          {tab === 'events' && (
            <div className="space-y-3">
              {events.map((ev) => (
                <PageCard key={ev.title} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center"><Calendar className="w-5 h-5 text-primary-600" /></span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{ev.title}</p>
                      <p className="text-xs text-slate-400">{ev.date} · {ev.time}</p>
                      <p className="text-xs text-primary-500 font-medium">{ev.participants} attending</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">RSVP</Button>
                </PageCard>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2"><Hash className="w-4 h-4 text-primary-500" />Community Rules</h3>
            <ol className="space-y-2">
              {community.rules.map((rule, i) => (
                <li key={rule} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="font-bold text-primary-500">{i + 1}.</span>{rule}
                </li>
              ))}
            </ol>
          </PageCard>
          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" />Top Contributors</h3>
            <div className="space-y-3">
              {members.slice(0, 3).map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="text-xs font-black text-amber-500 w-5">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                  <Avatar name={m.name} size="xs" />
                  <p className="text-xs font-semibold text-slate-700 flex-1 truncate">{m.name}</p>
                </div>
              ))}
            </div>
          </PageCard>
        </div>
      </div>
    </PageAmbient>
  )
}

export default CommunityDetail

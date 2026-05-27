import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks'
import { communities } from '@/constants/mockData'
import { communitySubjectTabs } from '@/constants/tokens'
import {
  SubjectTabs,
  CommunityPostComposer,
  CommunityPostCard,
  PageAmbient,
} from '@/components'
import clsx from 'clsx'

const posts = [
  {
    id: '1',
    author: 'Phe Sophy',
    authorRole: 'Teacher',
    dept: 'SCIENCE DEPT',
    time: '2h ago',
    content:
      'This teacher teaching is good I like it. Implementing these collaborative experiments has completely transformed the engagement levels in my Physics lab this week. Highly recommend exploring interactive simulations!',
    likes: 124,
    comments: 18,
    category: 'STEM',
  },
  {
    id: '2',
    author: 'Phe Sophy',
    authorRole: 'Teacher',
    dept: 'ENGLISH LITERATURE',
    time: '5h ago',
    content:
      "New resources for the upcoming semester's reading list are now available in the shared drive. Let's discuss the modern classics during Friday's huddle.",
    likes: 52,
    comments: 12,
    category: 'LANGUAGE',
  },
  {
    id: '3',
    author: 'Sokha Dara',
    authorRole: 'Student',
    time: '1d ago',
    content:
      'Just solved a tricky integration problem using integration by parts. Happy to share the solution if anyone needs help!',
    likes: 24,
    comments: 8,
    category: 'STEM',
  },
]

const Community = () => {
  const { user } = useAuth()
  const [activeFilter, setActiveFilter] = useState('ALL POSTS')
  const [postText, setPostText] = useState('')
  const [liked, setLiked] = useState([])
  const [joined, setJoined] = useState(['subject-mathematics'])

  const displayed =
    activeFilter === 'ALL POSTS'
      ? posts
      : posts.filter((p) => p.category === activeFilter)

  const toggleLike = (id) =>
    setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  return (
    <PageAmbient variant="community" className="space-y-10 sm:space-y-12">
      <section className="space-y-6 sm:space-y-7">
        <CommunityPostComposer
          userName={user?.name || 'Student'}
          value={postText}
          onChange={setPostText}
          onPost={() => setPostText('')}
        />

        <div className="glass-panel px-5 py-5 sm:px-6 sm:py-6">
          <SubjectTabs tabs={communitySubjectTabs} active={activeFilter} onChange={setActiveFilter} />
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-7 sm:gap-8">
          {displayed.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              liked={liked.includes(post.id)}
              onLike={() => toggleLike(post.id)}
            />
          ))}
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary-500" />
              <h3 className="font-bold text-slate-800 text-sm">Trending Topics</h3>
            </div>
            <div className="space-y-2">
              {['#Calculus', '#IELTS2026', '#Physics', '#PythonTips'].map((tag) => (
                <div key={tag} className="flex justify-between text-sm">
                  <span className="text-primary-600 font-semibold">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Communities</h3>
              <Link to="/community/create" className="text-xs text-primary-600 font-medium hover:underline">
                + New
              </Link>
            </div>
            <div className="space-y-3">
              {communities.map((c) => (
                <Link key={c.id} to={`/community/${c.id}`} className="flex items-center gap-3 group">
                  <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center text-base bg-gradient-to-br', c.color)}>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-primary-600">{c.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Users className="w-3 h-3" />
                      {c.members.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageAmbient>
  )
}

export default Community

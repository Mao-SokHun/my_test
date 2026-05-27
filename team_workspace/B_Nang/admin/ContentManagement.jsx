import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, BookOpen, Users, MessageSquare, Hash, FileText, Image } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { PageScaffold, PageCard, StatMetric, TabBar, DataTable } from '@/components'
import clsx from 'clsx'
import { featuredCommunities } from '../../constants/communities'

const contentStats = [
  { label: 'Communities', value: '42', change: '+3 this week', icon: Hash, tone: 'primary' },
  { label: 'Total Posts', value: '1,284', change: '+47 today', icon: FileText, tone: 'success' },
  { label: 'Teacher Profiles', value: '88', change: '+2 pending', icon: BookOpen, tone: 'primary' },
  { label: 'Media Files', value: '3,420', change: '1.2 GB used', icon: Image, tone: 'warning' },
]

const communities = featuredCommunities.map((c, i) => ({
  id: c.id,
  name: c.name,
  members: c.members,
  posts: c.topics,
  status: i === 4 ? 'pending' : i === 5 ? 'inactive' : 'active',
  category: c.category,
  icon: c.icon,
}))

const recentPosts = [
  { id: 1, author: 'Sokha Dara', community: 'Mathematics Hub', excerpt: 'Just solved a really tricky integration problem...', time: '15 min ago', status: 'published' },
  { id: 2, author: 'Linda Chea', community: 'English Learners', excerpt: 'Pro tip for IELTS Writing Task 2...', time: '1 hr ago', status: 'published' },
  { id: 3, author: 'Anonymous', community: 'Physics Explorers', excerpt: 'Flagged content - possible spam link detected', time: '2 hrs ago', status: 'flagged' },
  { id: 4, author: 'Bopha Keo', community: 'Data Science Cambodia', excerpt: "Anyone else find sklearn's RandomForest overfits?", time: '3 hrs ago', status: 'published' },
  { id: 5, author: 'New User', community: 'Web Dev Bootcamp', excerpt: 'First post in this community! Excited to learn React...', time: '5 hrs ago', status: 'pending' },
]

const postStatus = { published: { variant: 'success', label: 'Published' }, flagged: { variant: 'danger', label: 'Flagged' }, pending: { variant: 'warning', label: 'Pending' } }
const communityStatus = { active: { variant: 'success' }, inactive: { variant: 'neutral' }, pending: { variant: 'warning' } }

const postColumns = [
  {
    key: 'post',
    label: 'Post',
    render: (row) => (
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="font-semibold text-sm text-slate-800">{row.author}</span>
          <span className="text-xs text-slate-400">in</span>
          <span className="text-xs font-medium text-primary-600">{row.community}</span>
        </div>
        <p className="text-sm text-slate-500 truncate max-w-md">{row.excerpt}</p>
      </div>
    ),
  },
  { key: 'time', label: 'Time', render: (row) => <span className="text-xs text-slate-400">{row.time}</span> },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={postStatus[row.status].variant} size="sm">{postStatus[row.status].label}</Badge>,
  },
  {
    key: 'actions',
    label: '',
    className: 'text-right',
    render: () => (
      <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    ),
  },
]

const ContentManagement = () => {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('communities')

  const filteredCommunities = communities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <PageScaffold
        title="Content Management"
        subtitle="Manage communities, posts, and platform content"
        action={<Button variant="primary" size="sm"><Plus className="w-4 h-4" />Create Community</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {contentStats.map((s) => (
          <StatMetric key={s.label} label={s.label} value={s.value} change={s.change} icon={s.icon} tone={s.tone} />
        ))}
      </div>

      <TabBar tabs={['communities', 'posts', 'media']} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'communities' && (
        <PageCard padding={false}>
          <div className="p-4 border-b border-slate-100">
            <Input placeholder="Search communities..." leftIcon={<Search className="w-4 h-4" />} value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {filteredCommunities.map((c) => (
              <PageCard key={c.id} padding hover className="!shadow-none group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-xl">{c.icon}</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.category}</p>
                    </div>
                  </div>
                  <Badge variant={communityStatus[c.status].variant} size="sm" dot>{c.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.members.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{c.posts} posts</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" />View</Button>
                  <Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" />Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </PageCard>
            ))}
          </div>
        </PageCard>
      )}

      {activeTab === 'posts' && (
        <PageCard padding={false}>
          <div className="p-4 border-b border-slate-100">
            <Input placeholder="Search posts..." leftIcon={<Search className="w-4 h-4" />} className="w-56" />
          </div>
          <DataTable columns={postColumns} rows={recentPosts} />
        </PageCard>
      )}

      {activeTab === 'media' && (
        <PageCard>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={clsx('aspect-square rounded-xl flex items-center justify-center text-2xl border-2 border-slate-100 cursor-pointer hover:border-primary-200 transition-all',
                ['bg-primary-50', 'bg-primary-50', 'bg-emerald-50', 'bg-amber-50'][i % 4])}>
                {['🖼️', '📄', '🎬', '📊'][i % 4]}
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full w-[35%]" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">1.2 GB of 5 GB used (24%)</p>
        </PageCard>
      )}
    </PageScaffold>
  )
}

export default ContentManagement

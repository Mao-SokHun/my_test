import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, BookOpen, Hash, FileText, ChevronRight, X, Users } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { teachers } from '@/constants/mockData'
import { allCommunities } from '../../constants/communities'
import { FilterBar, TeacherRowCard, PageSection, TabBar, PageAmbient } from '@/components'
import clsx from 'clsx'

const communities = allCommunities.map((c) => ({
  id: c.id,
  name: c.name,
  icon: c.icon,
  members: c.members,
  posts: c.topics,
  category: c.category,
}))

const posts = [
  { id: 1, author: 'Sokha Dara', community: 'Mathematics Hub', title: 'Proof of the Fundamental Theorem of Calculus', preview: 'Just proved the FTC from scratch using epsilon-delta...', time: '2 hrs ago' },
  { id: 2, author: 'Dr. Sarah Jenkins', community: 'Mathematics Hub', title: 'MIT Linear Algebra Resources', preview: "Gilbert Strang's lectures are world-class and free...", time: '1 day ago' },
  { id: 3, author: 'Bopha Keo', community: 'English Learners', title: 'IELTS Writing Task 2 Tips', preview: 'Here are my top strategies that helped me score 7.5...', time: '3 days ago' },
]

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(true)
  const [rating, setRating] = useState('Any')
  const [price, setPrice] = useState('Any')
  const [subject, setSubject] = useState('All Subjects')

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: query })
  }

  const q = searchParams.get('q') || query

  const matchesQuery = (text) => !q || text.toLowerCase().includes(q.toLowerCase())

  const filteredTeachers = teachers.filter(
    (t) =>
      matchesQuery(t.name) ||
      matchesQuery(t.title) ||
      t.subjects.some((s) => matchesQuery(s))
  )

  const filteredCommunities = communities.filter(
    (c) => matchesQuery(c.name) || matchesQuery(c.category)
  )

  const filteredPosts = posts.filter(
    (p) => matchesQuery(p.title) || matchesQuery(p.preview) || matchesQuery(p.author)
  )

  const totalResults = filteredTeachers.length + filteredCommunities.length + filteredPosts.length

  const tabs = [
    { id: 'all', label: `All (${totalResults})` },
    { id: 'teachers', label: `Teachers (${filteredTeachers.length})` },
    { id: 'communities', label: `Communities (${filteredCommunities.length})` },
    { id: 'posts', label: `Posts (${filteredPosts.length})` },
  ]

  const resetFilters = () => {
    setRating('Any')
    setPrice('Any')
    setSubject('All Subjects')
  }

  return (
    <PageAmbient variant="search" className="space-y-5">
      <form onSubmit={handleSearch} className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center gap-3 glass-panel px-4 py-3 focus-within:ring-2 focus-within:ring-primary-200/80 transition-all">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teachers, communities, topics..."
            className="flex-1 text-slate-700 text-sm outline-none placeholder-slate-400"
            autoFocus
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button type="submit" variant="primary">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </form>

      {showFilters && (
        <FilterBar
          fields={[
            { id: 'rating', label: 'Rating', value: rating, onChange: setRating, options: ['Any', '4.5+', '4.0+', '3.5+'] },
            { id: 'price', label: 'Price', value: price, onChange: setPrice, options: ['Any', 'Under $20', '$20–$35', '$35+'] },
            { id: 'subject', label: 'Subject', value: subject, onChange: setSubject, options: ['All Subjects', 'Mathematics', 'English', 'Physics', 'Data Science', 'Chemistry'] },
          ]}
          onReset={resetFilters}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-slate-500 text-sm">
          {totalResults === 0 ? (
            <>No results for &ldquo;{q}&rdquo;</>
          ) : (
            <>
              <strong className="text-slate-800">{totalResults} results</strong>
              {q && <> for &ldquo;{q}&rdquo;</>}
            </>
          )}
        </p>
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} className="max-w-full" />
      </div>

      <div className="space-y-6">
        {(activeTab === 'all' || activeTab === 'teachers') && filteredTeachers.length > 0 && (
          <PageSection
            title={
              activeTab === 'all' ? (
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-500" />
                  Teachers
                </span>
              ) : (
                'Teachers'
              )
            }
            action={
              activeTab === 'all' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('teachers')}
                  className="text-xs text-primary-600 hover:underline flex items-center gap-1"
                >
                  See all <ChevronRight className="w-3 h-3" />
                </button>
              ) : null
            }
          >
            <div className="space-y-4">
              {(activeTab === 'all' ? filteredTeachers.slice(0, 3) : filteredTeachers).map((t) => (
                <TeacherRowCard key={t.id} teacher={t} />
              ))}
            </div>
          </PageSection>
        )}

        {(activeTab === 'all' || activeTab === 'communities') && filteredCommunities.length > 0 && (
          <PageSection
            title={
              <span className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-500" />
                Communities
              </span>
            }
          >
            <div className="grid sm:grid-cols-3 gap-3">
              {(activeTab === 'all' ? filteredCommunities.slice(0, 3) : filteredCommunities).map((c) => (
                <article
                  key={c.id}
                  className="glass-panel-hover p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-xl">{c.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800 truncate">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {c.members.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {c.posts} posts
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </PageSection>
        )}

        {(activeTab === 'all' || activeTab === 'posts') && filteredPosts.length > 0 && (
          <PageSection
            title={
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-500" />
                Posts
              </span>
            }
          >
            <div className="space-y-3">
              {filteredPosts.map((p) => (
                <article
                  key={p.id}
                  className="glass-panel-hover p-5"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={p.author} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800">{p.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        in <span className="text-primary-500">{p.community}</span>
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.preview}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        by {p.author} · {p.time}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </PageSection>
        )}

        {totalResults === 0 && q && (
          <div className="text-center py-16 glass-panel">
            <Search className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <h3 className="font-bold text-slate-600 mb-1">No results found</h3>
            <p className="text-sm text-slate-400 mb-5">Try different keywords or browse our categories</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {['Mathematics', 'English', 'Physics', 'Data Science'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s)
                    setSearchParams({ q: s })
                  }}
                  className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageAmbient>
  )
}

export default SearchResults

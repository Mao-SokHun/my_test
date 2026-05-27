import { Heart, MessageSquare, Share2 } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import clsx from 'clsx'

const CommunityPostCard = ({
  post,
  liked,
  onLike,
  onShare,
}) => (
  <article className="glass-panel-hover overflow-hidden">
    <div className="px-6 py-6 sm:px-7 sm:py-7">
      <div className="flex items-start gap-4 sm:gap-5">
        <Avatar name={post.author} size="sm" className="flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-w-0">
              <span className="font-bold text-sm text-slate-800">{post.author}</span>
              {post.dept && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{post.dept}</span>
              )}
              <Badge variant={post.authorRole === 'Teacher' ? 'primary' : 'neutral'} size="sm">
                {post.authorRole}
              </Badge>
            </div>
            <span className="text-xs text-slate-400 flex-shrink-0 pt-0.5">{post.time}</span>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-5 px-6 sm:px-7 py-4 border-t border-white/50 bg-white/15 backdrop-blur-sm">
      <button
        type="button"
        onClick={onLike}
        className={clsx(
          'flex items-center gap-1.5 text-xs font-medium',
          liked ? 'text-primary-600' : 'text-slate-500 hover:text-primary-600'
        )}
      >
        <Heart className={clsx('w-4 h-4', liked && 'fill-primary-500')} />
        {post.likes + (liked ? 1 : 0)}
      </button>
      <button type="button" className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-primary-600">
        <MessageSquare className="w-4 h-4" />
        {post.comments}
      </button>
      <button
        type="button"
        onClick={onShare}
        className="ml-auto p-1.5 text-slate-400 hover:text-primary-600 rounded-lg"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  </article>
)

export default CommunityPostCard

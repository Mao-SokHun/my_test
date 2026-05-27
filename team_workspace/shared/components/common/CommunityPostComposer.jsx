import { Image, Video, Smile } from 'lucide-react'
import Avatar from '../ui/Avatar'

const CommunityPostComposer = ({
  userName = 'User',
  value,
  onChange,
  onPost,
  maxLength = 500,
}) => (
  <div className="glass-panel p-6 sm:p-7">
    <div className="flex items-start gap-4 sm:gap-5">
      <Avatar name={userName} size="sm" className="mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full text-sm text-slate-700 bg-transparent outline-none resize-none placeholder-slate-400"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            {[
              { Icon: Video, label: 'Live Video' },
              { Icon: Image, label: 'Photo' },
              { Icon: Smile, label: 'Feeling' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">{value.length}/{maxLength}</span>
            <button
              type="button"
              disabled={!value.trim()}
              onClick={onPost}
              className="px-4 py-1.5 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 disabled:opacity-40 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CommunityPostComposer

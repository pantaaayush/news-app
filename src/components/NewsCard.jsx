import React from 'react'

const NewsCard = ({ article }) => {
  const { source, author, title, description, url, urlToImage, publishedAt } = article

  const timeAgo = (dateString) => {
    const date = new Date(dateString)
    const diff = Math.floor((Date.now() - date.getTime()) / 1000)
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=60'
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}

        {/* Source badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
          {source?.name || 'Unknown'}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title — 2 lines max */}
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {title}
        </h2>

        {/* Description — 3 lines max */}
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        )}

        {/* Footer row */}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span className="truncate max-w-[60%]">
            {author ? author.split(',')[0] : 'Unknown'}
          </span>
          <span>{timeAgo(publishedAt)}</span>
        </div>
      </div>
    </a>
  )
}

export default NewsCard
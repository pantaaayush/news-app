import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard'

const News = ({ category, articles, setArticles }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Map your category names to Guardian's section names
  const sectionMap = {
    general: 'news',
    business: 'business',
    entertainment: 'culture',
    health: 'society',
    science: 'science',
    sports: 'sport',
    technology: 'technology',
  }

  const fetchAllNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const section = sectionMap[category] || 'news'
      const res = await axios.get(
        `https://content.guardianapis.com/search?section=${section}&show-fields=thumbnail,trailText,byline&page-size=30&api-key=${import.meta.env.VITE_GUARDIAN_KEY}`
      )
      const articles = res.data.response.results.map((item) => ({
        title: item.webTitle,
        description: item.fields?.trailText || '',
        url: item.webUrl,
        urlToImage: item.fields?.thumbnail || null,
        publishedAt: item.webPublicationDate,
        source: { name: 'The Guardian' },
        author: item.fields?.byline || 'The Guardian',
      }))
      setArticles(articles)
    } catch (err) {
      console.log(err)
      setError('Failed to load news. Please try again.')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">
      {/* Hero header */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                The Guardian • {category}
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white capitalize">
                {category} Headlines
              </h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {loading
                  ? 'Fetching the latest stories...'
                  : `${articles.length} ${
                      articles.length === 1 ? 'story' : 'stories'
                    } found`}
              </p>
            </div>

            <button
              onClick={fetchAllNews}
              disabled={loading}
              className="self-start md:self-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium transition shadow-lg shadow-blue-600/20"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-700 dark:text-gray-300 text-lg">{error}</p>
            <button
              onClick={fetchAllNews}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
            >
              Try again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              No articles found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/3 mt-4" />
        </div>
      </div>
    ))}
  </div>
)

export default News
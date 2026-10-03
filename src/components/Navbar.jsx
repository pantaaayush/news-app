import { Menu, Search, X } from 'lucide-react'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext'
import { Link, NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'

const links = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']

const Navbar = ({ setArticles }) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debounceRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  const runSearch = async (q) => {
    if (!q.trim()) return
    try {
      const res = await axios.get(
        `https://content.guardianapis.com/search?q=${encodeURIComponent(q)}&show-fields=thumbnail,trailText,byline&page-size=30&api-key=${import.meta.env.VITE_GUARDIAN_KEY}`
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
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runSearch(value), 500)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    runSearch(query)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            News-YT
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 ml-4">
          {links.map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase()}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {link}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search news..."
              className="w-40 md:w-56 lg:w-64 pl-9 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
            />
          </form>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3 sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search news..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </form>

          <div className="flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link}
                to={`/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
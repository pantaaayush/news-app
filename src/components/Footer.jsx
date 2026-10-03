import { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const categories = [
    { name: 'General', path: '/general' },
    { name: 'Business', path: '/business' },
    { name: 'Technology', path: '/technology' },
    { name: 'Sports', path: '/sports' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Health', path: '/health' },
    { name: 'Science', path: '/science' },
  ]

  const socials = [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Newsletter banner */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Stay in the loop</h3>
            <p className="text-sm text-gray-400 mt-1">
              Get the latest headlines delivered straight to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You have successfully subscribed!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white group-hover:scale-105 transition">
              N
            </div>
            <span className="text-xl font-bold text-white">News-YT</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Your daily dose of headlines — breaking news, business, tech, sports,
            and everything in between, all in one place.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="w-9 h-9 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            Categories
          </h4>
          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.name}>
                <Link
                  to={c.path}
                  className="text-sm text-gray-400 hover:text-blue-400 transition inline-flex items-center gap-1 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-200" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5">
            {[
              { name: 'Home', path: '/' },
              { name: 'Science', path: '/science' },
              { name: 'Entertainment', path: '/entertainment' },
              { name: 'Health', path: '/health' },
            ].map((l) => (
              <li key={l.name}>
                <Link
                  to={l.path}
                  className="text-sm text-gray-400 hover:text-blue-400 transition inline-flex items-center gap-1 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-200" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / info */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            <li>
              <a
                href="https://github.com/rohitsingh93300"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} News-YT. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Powered by
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              NewsAPI
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
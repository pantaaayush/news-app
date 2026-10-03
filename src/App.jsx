import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import News from './pages/News'
import { ThemeContext } from './context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  const [articles, setArticles] = useState([])
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950">
        <Navbar setArticles={setArticles} />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path='/' element={<News country='us' category='general' articles={articles} setArticles={setArticles} />} />
            <Route path='/business' element={<News country='us' category='business' articles={articles} setArticles={setArticles} />} />
            <Route path='/entertainment' element={<News country='us' category='entertainment' articles={articles} setArticles={setArticles} />} />
            <Route path='/general' element={<News country='us' category='general' articles={articles} setArticles={setArticles} />} />
            <Route path='/health' element={<News country='us' category='health' articles={articles} setArticles={setArticles} />} />
            <Route path='/science' element={<News country='us' category='science' articles={articles} setArticles={setArticles} />} />
            <Route path='/sports' element={<News country='us' category='sports' articles={articles} setArticles={setArticles} />} />
            <Route path='/technology' element={<News country='us' category='technology' articles={articles} setArticles={setArticles} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
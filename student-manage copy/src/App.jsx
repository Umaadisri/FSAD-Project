import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './contexts/AuthContext.jsx'
import AppHeader from './components/layout/AppHeader.jsx'
import SideNav from './components/layout/SideNav.jsx'
import FooterTicker from './components/layout/FooterTicker.jsx'
import AuthModal from './components/auth/AuthModal.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import StudentProjectsPage from './pages/StudentProjectsPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}

function Shell() {
  const { user } = useAuth()
  const [navOpen, setNavOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(!user)

  return (
    <div className="app-root">
      <AppHeader
        navOpen={navOpen}
        onNavToggle={() => setNavOpen((v) => !v)}
        onProfileClick={() => setShowAuthModal(true)}
      />

      <div className="app-body">
        <SideNav navOpen={navOpen} onClose={() => setNavOpen(false)} />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/student/projects" element={<StudentProjectsPage />} />
            <Route path="/student/timeline" element={<TimelinePage />} />
            <Route path="/student/portfolio" element={<PortfolioPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>

      <FooterTicker />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  )
}

export default App

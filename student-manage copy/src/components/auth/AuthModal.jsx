import { useState } from 'react'
import { FaUserGraduate, FaChalkboardTeacher, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext.jsx'

const ROLES = [
  {
    value: 'student',
    label: 'Student',
    Icon: FaUserGraduate,
    description: 'Track projects, upload work & build your portfolio',
  },
  {
    value: 'admin',
    label: 'Admin / Faculty',
    Icon: FaChalkboardTeacher,
    description: 'Review submissions, give feedback & monitor cohort progress',
  },
]

export default function AuthModal({ onClose }) {
  const { user, login, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [role, setRole] = useState(user?.role || 'student')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    login({ name: name.trim(), role })
    onClose()
  }

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── Left hero panel ── */}
        <div className="auth-hero">
          <button
            className="auth-close desktop-hidden"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="auth-hero-logo">
            <span className="auth-hero-mark">◆</span>
          </div>
          <h2 className="auth-hero-title">Projectfolio</h2>
          <p className="auth-hero-sub">
            One verified workspace for academic project tracking, mentorship,
            and portfolio building.
          </p>
          <ul className="auth-feature-list">
            <li>✦ Track milestones & progress</li>
            <li>✦ Receive faculty feedback</li>
            <li>✦ Showcase your portfolio</li>
          </ul>
        </div>

        {/* ── Right form panel ── */}
        <div className="auth-form-panel">
          <button
            className="auth-close auth-close-right"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <div className="auth-form-header">
            <h3 className="auth-form-title">
              {user ? 'Your profile' : 'Get started'}
            </h3>
            <p className="auth-form-sub">
              {user
                ? 'Update your name or switch roles.'
                : 'Enter your campus name and choose your role.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="auth-field">
              <label className="auth-field-label" htmlFor="auth-name">
                Full name
              </label>
              <input
                id="auth-name"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                required
                autoFocus
              />
            </div>

            {/* Role selector */}
            <div className="auth-field">
              <span className="auth-field-label">I am a…</span>
              <div className="auth-role-grid">
                {ROLES.map(({ value, label, Icon, description }) => (
                  <button
                    key={value}
                    type="button"
                    className={`auth-role-card ${role === value ? 'auth-role-card-active' : ''}`}
                    onClick={() => setRole(value)}
                  >
                    <Icon className="auth-role-icon" />
                    <span className="auth-role-label">{label}</span>
                    <span className="auth-role-desc">{description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="auth-actions">
              {user && (
                <button
                  type="button"
                  className="auth-signout-btn"
                  onClick={() => {
                    logout()
                    onClose()
                  }}
                >
                  Sign out
                </button>
              )}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={!name.trim()}
              >
                {user ? 'Save changes' : `Continue as ${role === 'admin' ? 'Faculty' : 'Student'} →`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

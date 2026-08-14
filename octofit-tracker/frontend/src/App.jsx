import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  const endpoints = {
    users: `${apiBaseUrl}/api/users/`,
    activities: `${apiBaseUrl}/api/activities/`,
    teams: `${apiBaseUrl}/api/teams/`,
    leaderboard: `${apiBaseUrl}/api/leaderboard/`,
    workouts: `${apiBaseUrl}/api/workouts/`,
  }

  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div className="container py-4">
          <p className="text-uppercase tracking">OctoFit Tracker</p>
          <h1 className="mb-3">Presentation Tier</h1>
          <p className="mb-3">
            API base URL: <code>{apiBaseUrl}</code>
          </p>
          {!codespaceName && (
            <div className="alert alert-warning mb-0" role="alert">
              <strong>VITE_CODESPACE_NAME is not set.</strong> Using localhost fallback to avoid invalid URLs.
            </div>
          )}
        </div>
      </header>

      <nav className="border-bottom">
        <div className="container py-3 d-flex gap-2 flex-wrap">
          <NavLink className="btn btn-outline-primary" to="/users">
            Users
          </NavLink>
          <NavLink className="btn btn-outline-primary" to="/activities">
            Activities
          </NavLink>
          <NavLink className="btn btn-outline-primary" to="/teams">
            Teams
          </NavLink>
          <NavLink className="btn btn-outline-primary" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="btn btn-outline-primary" to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users endpoint={endpoints.users} />} />
          <Route path="/activities" element={<Activities endpoint={endpoints.activities} />} />
          <Route path="/teams" element={<Teams endpoint={endpoints.teams} />} />
          <Route path="/leaderboard" element={<Leaderboard endpoint={endpoints.leaderboard} />} />
          <Route path="/workouts" element={<Workouts endpoint={endpoints.workouts} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

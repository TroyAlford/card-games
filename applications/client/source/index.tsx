import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { Game, GameWithParams } from './pages/Game'
import { Lobby } from './pages/Lobby'
import './styles/global.scss'

class App extends React.Component {
  override render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            element={<Navigate to="/lobby" />}
            path="/"
          />
          <Route
            element={<Lobby />}
            path="/lobby"
          />
          <Route
            element={<GameWithParams />}
            path="/game/:id"
          />
        </Routes>
      </BrowserRouter>
    )
  }
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
} else {
  throw new Error('Root element not found')
}

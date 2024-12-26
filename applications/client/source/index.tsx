import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Game, GameWithParams } from './pages/Game'
import { Lobby } from './pages/Lobby'
import { ApplicationStore } from './stores/ApplicationStore'
import './styles/global.scss'

const store = new ApplicationStore()

class App extends React.Component {
  override render() {
    return (
      <BrowserRouter>
        <Layout store={store}>
          <Routes>
            <Route element={<Navigate to="/lobby" />} path="/" />
            <Route element={<Lobby store={store} />} path="/lobby" />
            <Route element={<GameWithParams store={store} />} path="/game/:id" />
          </Routes>
        </Layout>
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

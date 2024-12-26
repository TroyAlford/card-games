import * as React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ApplicationContext } from './contexts/ApplicationContext'
import { Game } from './pages/Game'
import { Lobby } from './pages/Lobby'
import type { ApplicationStore } from './stores/ApplicationStore'

interface Props {
  store: ApplicationStore,
}

export class Application extends React.Component<Props> {
  override render() {
    const { store } = this.props

    return (
      <ApplicationContext.Provider value={{ store }}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route element={<Navigate to="/lobby" />} path="/" />
              <Route element={<Lobby />} path="/lobby" />
              <Route element={<Game />} path="/game/:id" />
              <Route element={<Navigate to="/lobby" />} path="*" />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApplicationContext.Provider>
    )
  }
}

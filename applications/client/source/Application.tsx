import * as React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Game } from './pages/Game'
import { Lobby } from './pages/Lobby'

export class Application extends React.Component {
  override render() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route Component={Lobby} path="/lobby" />
            <Route Component={Game} path="/game/:id" />
            <Route element={<Navigate to="/lobby" />} path="*" />
          </Routes>
        </Layout>
      </BrowserRouter>
    )
  }
}

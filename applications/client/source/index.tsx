import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Application } from './Application'
import { ApplicationStore } from './stores/ApplicationStore'
import './styles/global.scss'

const store = new ApplicationStore()

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<Application store={store} />)
} else {
  throw new Error('Root element not found')
}

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Application } from './Application'
import './styles/global.scss'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<Application />)
} else {
  throw new Error('Root element not found')
}

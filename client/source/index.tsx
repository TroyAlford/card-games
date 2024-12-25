import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Application } from './Application'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) {
	throw new Error('Failed to find root element')
}

const root = createRoot(container)
root.render(<Application />) 
import { createContext } from 'react'
import { ApplicationStore } from '../stores/ApplicationStore'

export const ApplicationContext = createContext<ApplicationStore>(ApplicationStore.singleton())

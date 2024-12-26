import { createContext } from 'react'
import type { ApplicationStore } from '../stores/ApplicationStore'

interface ApplicationContextValue {
  store: ApplicationStore,
}

export const ApplicationContext = createContext<ApplicationContextValue>({
  store: null as unknown as ApplicationStore,
})

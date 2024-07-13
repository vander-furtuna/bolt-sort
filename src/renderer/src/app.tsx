import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { Routes } from './routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors theme="dark" />
      <Routes />
    </QueryClientProvider>
  )
}

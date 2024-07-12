import { Route, Router } from 'electron-router-dom'

import { Home } from './pages/home'
import { AppLayout } from './pages/layouts/app-layout'
import { Sorter } from './pages/sorter'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sorter/:id" element={<Sorter />} />
        </Route>
      }
    />
  )
}

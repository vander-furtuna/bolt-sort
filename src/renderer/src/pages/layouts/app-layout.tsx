import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../components/sidebar'

export function AppLayout() {
  return (
    <div className="flex size-full backdrop:blur-md">
      <Sidebar />

      <main className="flex size-full">
        <Outlet />
      </main>
    </div>
  )
}

"use client"

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "./sidebar"
import Header from "./header"

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const isAuthPage = pathname === "/login" // ou outras rotas tipo /signup etc.

  return (
    <div className="flex">
      {!isAuthPage && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      )}

      <div className={`flex flex-col flex-1 min-h-screen ${!isAuthPage ? "ml-16 lg:ml-64" : ""}`}>
        {!isAuthPage && (
          <Header
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
          />
        )}

        <main className={isAuthPage ? "" : "p-4"}>
          {children}
        </main>
      </div>
    </div>
  )
}

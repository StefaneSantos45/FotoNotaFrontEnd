"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Menu } from "lucide-react"
import { useAuth } from "../modules/auth/context/auth-context"

interface HeaderProps {
  sidebarCollapsed: boolean
  setSidebarOpen: (open: boolean) => void
}

function Header({ sidebarCollapsed, setSidebarOpen }: HeaderProps) {
  const { user } = useAuth()

  // Função para obter as iniciais do nome do usuário
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Função para obter a cor do avatar baseada no role
  const getAvatarColor = (roleId: string) => {
    switch (roleId) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500"
      case "manager":
        return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case "operator":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "viewer":
        return "bg-gradient-to-r from-gray-500 to-slate-500"
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500"
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-80 bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
            <div
              className={`w-9 h-9 ${getAvatarColor(user?.role?.id || "default")} rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md`}
            >
              {user?.avatar || getUserInitials(user?.name || "Usuario")}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">{user?.name || "Usuário"}</p>
              <p className="text-xs text-slate-500">{user?.role?.name || "Carregando..."}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header } // exportação nomeada
export default Header // exportação default

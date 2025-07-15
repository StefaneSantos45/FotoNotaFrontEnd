"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Camera,
  Users,
  TrendingUp,
  Home,
  FileImage,
  Printer,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  User,
  X,
  LogOut,
  ShieldX,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { useAuth } from "../modules/auth/context/auth-context"
import styles from "./sidebar.module.css"

interface MenuItem {
  icon: any
  label: string
  path: string
  hasSubmenu?: boolean
  submenu?: MenuItem[]
}

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string | null>(null)
  const { logout, user } = useAuth()

  useEffect(() => {
    if (!user) {
      setExpanded(null)
    }
  }, [user])

  const isActive = (path: string) =>
  pathname === path || (typeof pathname === "string" && pathname.startsWith(path + "/"))
  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key)
  }

  const handleLogout = () => {
    setExpanded(null)
    logout()
  }

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Painel", path: "/painel" },
    { icon: Users, label: "Grupos", path: "/grupos" },
    { icon: FileImage, label: "Molduras", path: "/molduras" },
    { icon: Printer, label: "Pedidos", path: "/pedidos" },
    { icon: Settings, label: "Preço", path: "/preco" },
    {
      icon: BarChart3,
      label: "Estatística",
      path: "/estatistica",
      hasSubmenu: true,
      submenu: [
        { icon: BarChart3, label: "Quiosque", path: "/estatistica/quiosque" },
        { icon: TrendingUp, label: "Layout", path: "/estatistica/layout" },
        { icon: Printer, label: "Status da impressão do quiosque", path: "/estatistica/status" },
      ],
    },
    { icon: FileImage, label: "Anúncio", path: "/anuncio" },
    { icon: Settings, label: "Modos personalizados", path: "/modos" },
    { icon: Camera, label: "Fotos de identificação", path: "/fotos" },
    {
      icon: Users,
      label: "Fatura",
      path: "/fatura",
      hasSubmenu: true,
      submenu: [
        { icon: FileImage, label: "Faturamento", path: "/invoices/invoicing" },
        { icon: FileImage, label: "Faturas", path: "/invoices/invoice" },
      ],
    },
    {
      icon: FileImage,
      label: "Quiosques",
      path: "/quiosques",
      hasSubmenu: true,
      submenu: [
        { icon: FileImage, label: "Lista", path: "/quiosques/lista" },
        { icon: Settings, label: "Comandos", path: "/quiosques/commands" },
        { icon: Settings, label: "Predefinições", path: "/quiosques/predefinicoes" },
        { icon: FileImage, label: "Coleções", path: "/quiosques/colecoes" },
        { icon: Bell, label: "Avisos", path: "/quiosques/avisos" },
      ],
    },
    { icon: Settings, label: "Layouts", path: "/layouts" },
    {
      icon: FileImage,
      label: "Registros",
      path: "/registros",
      hasSubmenu: true,
      submenu: [
        { icon: FileImage, label: "Pagamentos Bcel", path: "/registros/pagamentos-bcel" },
        { icon: FileImage, label: "Pagamentos Ksher", path: "/registros/pagamentos-ksher" },
        { icon: FileImage, label: "Registros de pagamento", path: "/registros/registros-pagamento" },
        { icon: Camera, label: "Fotos impressas", path: "/registros/fotos-impressas" },
        { icon: FileImage, label: "Pagamentos RM", path: "/registros/pagamentos-rm" },
        { icon: FileImage, label: "Registros de sessão", path: "/registros/registros-sessao" },
      ],
    },
    {
      icon: Settings,
      label: "Organização",
      path: "/organizacao",
      hasSubmenu: true,
      submenu: [
        { icon: Building2, label: "Departamentos", path: "/organizacao/departamentos" },
        { icon: User, label: "Usuários", path: "/organizacao/usuarios" },
      ],
    },
    {
      icon: Settings,
      label: "Outro",
      path: "/outros",
      hasSubmenu: true,
      submenu: [
        { icon: FileImage, label: "Regiões", path: "/outros/regioes" },
        { icon: Settings, label: "Funções", path: "/outros/funcoes" },
        { icon: ShieldX, label: "Permissões", path: "/outros/permissoes" },
      ],
    },
    {
      icon: FileImage,
      label: "Código promocional",
      path: "/codigo-promocional",
      hasSubmenu: true,
      submenu: [
        { icon: FileImage, label: "Eventos", path: "/codigo-promocional/codigos-eventos" },
        { icon: FileImage, label: "Códigos", path: "/codigo-promocional/codigos" },
        { icon: FileImage, label: "Código rápido", path: "/codigo-promocional/codigo-rapido" },
      ],
    },
  ]

  const allowedForGerente = [
    "/painel",
    "/grupos",
    "/molduras",
    "/pedidos",
    "/preco",
  ]

  const shouldShowMenuItem = (item: MenuItem): boolean => {
    if (user?.role?.name === "Gerente") {
      return allowedForGerente.includes(item.path)
    }
    return true
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-slate-900 text-white z-50 transform transition-all duration-300
        ${sidebarCollapsed ? "w-16" : "w-64"} ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-r border-slate-700`}
      >
        <div className="flex items-center justify-between p-4 h-14">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                FnPix
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex text-slate-400 hover:text-white"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X />
            </Button>
          </div>
        </div>

        <div className={`overflow-y-auto h-[calc(100%-56px)] px-3 pb-6 ${styles.customScrollbar}`}>
          <nav>
            {menuItems.filter(shouldShowMenuItem).map((item) => (
              <div key={item.path}>
                {!item.hasSubmenu ? (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 ${
                        isActive(item.path) || expanded === item.path
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {!sidebarCollapsed && (
                          <span className="text-sm font-medium">{item.label}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown
                          className={`w-4 h-4 ${
                            expanded === item.path ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {expanded === item.path && !sidebarCollapsed && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                              isActive(subItem.path)
                                ? "bg-blue-500/20 text-blue-300"
                                : "text-slate-400 hover:bg-slate-700/30 hover:text-white"
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="mt-6">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start px-3 py-3 text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {!sidebarCollapsed && <span className="text-sm">Sair do Sistema</span>}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

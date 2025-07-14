import { Permission, Role, User } from "../types/auth"


// Definir todas as permissões do sistema
export const PERMISSIONS: Permission[] = [
  // Dashboard
  {
    id: "dashboard_view",
    name: "Ver Dashboard",
    description: "Visualizar painel principal",
    resource: "dashboard",
    action: "view",
  },

  // Faturamento
  {
    id: "billing_view",
    name: "Ver Faturamento",
    description: "Visualizar relatórios financeiros",
    resource: "billing",
    action: "view",
  },
  {
    id: "billing_export",
    name: "Exportar Faturamento",
    description: "Exportar relatórios em PDF/Excel",
    resource: "billing",
    action: "export",
  },
  {
    id: "billing_details",
    name: "Ver Detalhes",
    description: "Ver detalhes completos de faturamento",
    resource: "billing",
    action: "details",
  },

  // Estatísticas
  {
    id: "stats_view",
    name: "Ver Estatísticas",
    description: "Visualizar estatísticas gerais",
    resource: "statistics",
    action: "view",
  },
  {
    id: "stats_advanced",
    name: "Estatísticas Avançadas",
    description: "Ver relatórios avançados",
    resource: "statistics",
    action: "advanced",
  },

  // Quiosques
  {
    id: "kiosks_view",
    name: "Ver Quiosques",
    description: "Visualizar status dos quiosques",
    resource: "kiosks",
    action: "view",
  },
  {
    id: "kiosks_manage",
    name: "Gerenciar Quiosques",
    description: "Configurar e gerenciar quiosques",
    resource: "kiosks",
    action: "manage",
  },
  {
    id: "kiosks_restart",
    name: "Reiniciar Quiosques",
    description: "Reiniciar quiosques remotamente",
    resource: "kiosks",
    action: "restart",
  },

  // Usuários
  {
    id: "users_view",
    name: "Ver Usuários",
    description: "Visualizar lista de usuários",
    resource: "users",
    action: "view",
  },
  {
    id: "users_create",
    name: "Criar Usuários",
    description: "Criar novos usuários",
    resource: "users",
    action: "create",
  },
  {
    id: "users_edit",
    name: "Editar Usuários",
    description: "Editar dados de usuários",
    resource: "users",
    action: "edit",
  },
  {
    id: "users_delete",
    name: "Excluir Usuários",
    description: "Excluir usuários do sistema",
    resource: "users",
    action: "delete",
  },

  // Roles e Permissões
  {
    id: "roles_view",
    name: "Ver Roles",
    description: "Visualizar roles do sistema",
    resource: "roles",
    action: "view",
  },
  {
    id: "roles_manage",
    name: "Gerenciar Roles",
    description: "Criar e editar roles",
    resource: "roles",
    action: "manage",
  },

  // Anúncios
  {
    id: "ads_view",
    name: "Ver Anúncios",
    description: "Visualizar campanhas publicitárias",
    resource: "ads",
    action: "view",
  },
  { id: "ads_create", name: "Criar Anúncios", description: "Criar novas campanhas", resource: "ads", action: "create" },
  {
    id: "ads_edit",
    name: "Editar Anúncios",
    description: "Editar campanhas existentes",
    resource: "ads",
    action: "edit",
  },

  // Configurações
  {
    id: "settings_view",
    name: "Ver Configurações",
    description: "Visualizar configurações do sistema",
    resource: "settings",
    action: "view",
  },
  {
    id: "settings_edit",
    name: "Editar Configurações",
    description: "Modificar configurações do sistema",
    resource: "settings",
    action: "edit",
  },
]

// Definir roles do sistema
export const ROLES: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso total ao sistema",
    level: 100,
    permissions: PERMISSIONS, // Admin tem todas as permissões
  },
  {
    id: "manager",
    name: "Gerente",
    description: "Acesso apenas ao painel principal",
    level: 80,
    permissions: PERMISSIONS.filter((p) => p.id === "dashboard_view"),
  },
  {
    id: "operator",
    name: "Operador",
    description: "Operações básicas e visualização",
    level: 60,
    permissions: PERMISSIONS.filter((p) =>
      ["dashboard_view", "billing_view", "stats_view", "kiosks_view", "ads_view"].includes(p.id),
    ),
  },
  {
    id: "viewer",
    name: "Visualizador",
    description: "Apenas visualização de dados",
    level: 40,
    permissions: PERMISSIONS.filter((p) => ["dashboard_view", "billing_view", "stats_view"].includes(p.id)),
  },
]

// Usuários de demonstração
export const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "WTotem Admin",
    email: "admin@fnpix.com",
    role: ROLES.find((r) => r.id === "admin")!,
    avatar: "WA",
    isActive: true,
    createdAt: "2024-01-01",
    lastLogin: "2024-12-26",
  },
  {
    id: "2",
    name: "João Gerente",
    email: "gerente@fnpix.com",
    role: ROLES.find((r) => r.id === "manager")!,
    avatar: "JG",
    isActive: true,
    createdAt: "2024-01-15",
    lastLogin: "2024-12-25",
  },
  {
    id: "3",
    name: "Maria Operadora",
    email: "operador@fnpix.com",
    role: ROLES.find((r) => r.id === "operator")!,
    avatar: "MO",
    isActive: true,
    createdAt: "2024-02-01",
    lastLogin: "2024-12-24",
  },
  {
    id: "4",
    name: "Carlos Visualizador",
    email: "viewer@fnpix.com",
    role: ROLES.find((r) => r.id === "viewer")!,
    avatar: "CV",
    isActive: true,
    createdAt: "2024-02-15",
    lastLogin: "2024-12-23",
  },
]

export class PermissionService {
  static hasPermission(user: User | null, resource: string, action: string): boolean {
    if (!user || !user.isActive) return false

    return user.role.permissions.some((permission) => permission.resource === resource && permission.action === action)
  }

  static hasRole(user: User | null, roleName: string): boolean {
    if (!user || !user.isActive) return false
    return user.role.name.toLowerCase() === roleName.toLowerCase()
  }

  static hasMinimumLevel(user: User | null, minimumLevel: number): boolean {
    if (!user || !user.isActive) return false
    return user.role.level >= minimumLevel
  }

  static getUserByCredentials(email: string, password: string): User | null {
    // Credenciais de demonstração
    const credentials = [
      { email: "admin@fnpix.com", password: "123456", userId: "1" },
      { email: "gerente@fnpix.com", password: "123456", userId: "2" },
      { email: "operador@fnpix.com", password: "123456", userId: "3" },
      { email: "viewer@fnpix.com", password: "123456", userId: "4" },
    ]

    const credential = credentials.find((c) => c.email === email && c.password === password)
    if (!credential) return null

    return DEMO_USERS.find((u) => u.id === credential.userId) || null
  }
}

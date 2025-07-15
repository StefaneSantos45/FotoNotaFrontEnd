// src/modules/permissoes/types/index.ts

export interface Permission {
  id: string
  name: string
  description: string
  category: string
  resource: string
  action: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PermissionCategory {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

// Evite referência circular com Role -> User -> Role
export interface Role {
   id: string | number; // <- alteração aqui
  name: string
  slug: string
  description: string
  permissions: Permission[]
  color?: string
  userCount?: number // opcional, apenas para visualização
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: number
  name: string
  email: string
  active: boolean
  role?: Role // se o usuário tiver uma função principal
  roles?: Role[] // se puder ter múltiplas funções
  directPermissions?: Permission[]
}

export interface PermissionCheck {
  resource: string
  action: string
  userId?: number
  roleId?: string
}

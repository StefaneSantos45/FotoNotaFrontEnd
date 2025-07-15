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

export interface Role {
  id: number
  name: string
  slug: string
  description: string
  permissions: Permission[]
  users: User[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: number
  name: string
  email: string
  active: boolean
  roles: Role[]
  directPermissions: Permission[]
}

export interface PermissionCheck {
  resource: string
  action: string
  userId?: number
  roleId?: number
}

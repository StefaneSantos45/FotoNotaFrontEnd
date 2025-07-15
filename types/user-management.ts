export interface User {
  id: number
  name: string
  email: string
  active: boolean
  avatar?: string
  createdAt: Date
  updatedAt: Date
  roles: Role[]
  directPermissions: Permission[]
}

export interface Role {
  id: number
  name: string
  slug: string
  description: string
  color: string
  permissions: Permission[]
  userCount: number
  createdAt: Date
  updatedAt: Date
}

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

export interface UserRoleAssignment {
  userId: number
  roleId: number
  assignedAt: Date
  assignedBy: number
}

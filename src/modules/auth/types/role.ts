import { Permission } from "./permission"
import { User } from "./user"

export interface Role {
  id: string
  name: string
  slug: string
  description: string
  permissions: Permission[]
  users: User[]
  userCount: number
  color?: string
  createdAt: Date
  updatedAt: Date
}

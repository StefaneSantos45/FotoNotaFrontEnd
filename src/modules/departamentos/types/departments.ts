export interface Department {
  id: number
  name: string
  description?: string
  active: boolean
  createdAt: Date
}

export interface CreateUserData {
  name: string
  email: string
  phoneNumber?: string
  password: string
  departmentId: number
}

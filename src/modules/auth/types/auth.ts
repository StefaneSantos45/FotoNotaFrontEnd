export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthContextType {
  user: User | null;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
  isLoading: boolean;
  hasPermission(resource: string, action: string): boolean;
  hasRole(roleName: string): boolean;
}

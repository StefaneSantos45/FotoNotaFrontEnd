"use client"

import { useState } from "react"
import { Permission, PermissionCheck, User } from "../types/permissions"
import { systemPermissions } from "../data/permissions-data"

// Simulando usuário logado
const currentUser: User = {
  id: 1,
  name: "Admin User",
  email: "admin@fnpix.com",
  active: true,
  roles: [],
  directPermissions: systemPermissions, // Admin tem todas as permissões
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>(systemPermissions)
  const [user] = useState<User>(currentUser)

  const hasPermission = (resource: string, action: string): boolean => {
    // Verifica permissões diretas do usuário
const directPermission = (user.directPermissions ?? []).find(
  (p) => p.resource === resource && p.action === action && p.active
);
    if (directPermission) return true

   for (const role of user.roles ?? []) {
  const rolePermission = role.permissions.find(
    (p) => p.resource === resource && p.action === action && p.active
  );
  if (rolePermission) return true;
}

    return false
  }

  const hasAnyPermission = (checks: PermissionCheck[]): boolean => {
    return checks.some((check) => hasPermission(check.resource, check.action))
  }

  const hasAllPermissions = (checks: PermissionCheck[]): boolean => {
    return checks.every((check) => hasPermission(check.resource, check.action))
  }

const getUserPermissions = (): Permission[] => {
  // Garante que directPermissions seja array, mesmo se undefined
  const allPermissions: Permission[] = [...(user.directPermissions ?? [])];

  // Garante que roles seja array, mesmo se undefined
  (user.roles ?? []).forEach((role) => {
    role.permissions.forEach((permission) => {
      if (!allPermissions.find((p) => p.id === permission.id)) {
        allPermissions.push(permission);
      }
    });
  });

  return allPermissions;
};

  const createPermission = (permission: Omit<Permission, "id" | "createdAt" | "updatedAt">): Permission => {
    const newPermission: Permission = {
      ...permission,
      id: `${permission.resource}.${permission.action}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setPermissions((prev) => [...prev, newPermission])
    return newPermission
  }

  const updatePermission = (id: string, updates: Partial<Permission>): Permission | null => {
    const permissionIndex = permissions.findIndex((p) => p.id === id)
    if (permissionIndex === -1) return null

    const updatedPermission = {
      ...permissions[permissionIndex],
      ...updates,
      updatedAt: new Date(),
    }

    setPermissions((prev) => prev.map((p, index) => (index === permissionIndex ? updatedPermission : p)))

    return updatedPermission
  }

  const deletePermission = (id: string): boolean => {
    const permissionExists = permissions.some((p) => p.id === id)
    if (!permissionExists) return false

    setPermissions((prev) => prev.filter((p) => p.id !== id))
    return true
  }

  return {
    permissions,
    user,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    createPermission,
    updatePermission,
    deletePermission,
  }
}

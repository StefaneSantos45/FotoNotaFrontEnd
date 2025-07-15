import type { User, Role } from "../types/user-management"
import { systemPermissions } from "../data/permissions-data"

export const rolesMock: Role[] = [
  {
    id: 1,
    name: "Super Administrador",
    slug: "super-admin",
    description: "Acesso total ao sistema",
    color: "red",
    permissions: systemPermissions,
    userCount: 2,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Administrador",
    slug: "admin",
    description: "Gerenciamento geral do sistema",
    color: "blue",
    permissions: systemPermissions.filter((p) => !p.id.includes("system.") || p.id === "system.logs"),
    userCount: 5,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Gerente de Quiosques",
    slug: "kiosk-manager",
    description: "Gerenciamento de quiosques e relatórios",
    color: "green",
    permissions: systemPermissions.filter((p) => p.category === "kiosk-management" || p.category === "analytics"),
    userCount: 8,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "Operador",
    slug: "operator",
    description: "Operação básica dos quiosques",
    color: "yellow",
    permissions: systemPermissions.filter(
      (p) => p.action === "view" && (p.category === "kiosk-management" || p.category === "analytics"),
    ),
    userCount: 15,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "Suporte Técnico",
    slug: "support",
    description: "Suporte técnico e manutenção",
    color: "purple",
    permissions: systemPermissions.filter((p) => p.category === "kiosk-management" || p.id === "system.logs"),
    userCount: 6,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

export const usersMock: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@fnpix.com",
    active: true,
    avatar: "JS",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    roles: [rolesMock[0]], // Super Admin
    directPermissions: [],
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@fnpix.com",
    active: true,
    avatar: "MS",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    roles: [rolesMock[1]], // Admin
    directPermissions: [],
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro.costa@fnpix.com",
    active: true,
    avatar: "PC",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    roles: [rolesMock[2], rolesMock[4]], // Gerente + Suporte
    directPermissions: [],
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@fnpix.com",
    active: false,
    avatar: "AO",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    roles: [rolesMock[3]], // Operador
    directPermissions: [],
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@fnpix.com",
    active: true,
    avatar: "CF",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    roles: [rolesMock[2]], // Gerente
    directPermissions: [],
  },
  {
    id: 6,
    name: "Lucia Mendes",
    email: "lucia.mendes@fnpix.com",
    active: true,
    avatar: "LM",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    roles: [rolesMock[3], rolesMock[4]], // Operador + Suporte
    directPermissions: [],
  },
]

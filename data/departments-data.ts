import type { Department } from "../types/departments"

export const departmentsMock: Department[] = [
  {
    id: 1,
    name: "FotoNotaBR (Brasil)",
    description: "Departamento principal do Brasil",
    active: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Tecnologia",
    description: "Departamento de desenvolvimento e TI",
    active: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Comercial",
    description: "Departamento de vendas e relacionamento",
    active: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "Suporte",
    description: "Departamento de atendimento ao cliente",
    active: true,
    createdAt: new Date("2024-01-01"),
  },
]

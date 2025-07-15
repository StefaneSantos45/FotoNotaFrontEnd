import type { Department, Country } from "../types/departments-full"


export const countriesMock: Country[] = [
  {
    code: "BR",
    name: "Brasil",
    timezones: ["America/Sao_Paulo", "America/Recife", "America/Manaus", "America/Rio_Branco"],
  },
  {
    code: "ES",
    name: "Espanha",
    timezones: ["Europe/Madrid", "Atlantic/Canary"],
  },
  {
    code: "PT",
    name: "Portugal",
    timezones: ["Europe/Lisbon", "Atlantic/Azores"],
  },
  {
    code: "US",
    name: "Estados Unidos",
    timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"],
  },
]

export const departmentsFullMock: Department[] = [
  {
    id: 120,
    name: "FotoNotaBR",
    country: "padrão (Brasil)",
    timezone: "America/Recife",
    cutoffTime: "05:00",
    supportContact: "+55 11 99999-9999",
    supportContactType: "telefone",
    workTimeSupport: "08:00 - 18:00",
    ksherMerchantId: "KSHER123456",
    ksherKey: "sk_test_123456789abcdef",
    promoCodesList: [
      { id: "1", code: "DESCONTO10", value: 10 },
      { id: "2", code: "PROMO20", value: 20 },
    ],
    active: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

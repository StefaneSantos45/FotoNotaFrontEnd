export interface Department {
  id: number
  name: string
  country: string
  timezone: string
  cutoffTime: string
  supportContact: string
  supportContactType: "telefone" | "whatsapp"
  workTimeSupport: string
  ksherMerchantId: string
  ksherKey: string
  promoCodesList: PromoCode[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PromoCode {
  id: string
  code: string
  value: number
}

export interface CreateDepartmentData {
  name: string
  country: string
  timezone: string
  cutoffTime: string
  supportContact: string
  supportContactType: "telefone" | "whatsapp"
  workTimeSupport: string
  ksherMerchantId: string
  ksherKey: string
  promoCodesList: PromoCode[]
}

export interface Country {
  code: string
  name: string
  timezones: string[]
}

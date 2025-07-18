export interface Plan {
  id: number
  description: string
  numberOfClients: number
  gigabytesStorage: number
  price: number  
  active: boolean
}

export interface Contract {
  id: number
  user_id: number
  plan_id: number
  is_active: boolean
  started_at: string
  ended_at?: string | null  
  created_at: string
  updated_at: string
  credit_remaining?: number
  plan?: Plan
}

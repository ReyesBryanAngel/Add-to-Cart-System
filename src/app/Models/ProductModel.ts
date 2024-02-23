export interface IProduct {
  id: number
  image: string
  name: string
  description: string
  price: number
  originalPrice: number
  quantity: number
  status: string
  date_created: string
  date_updated: string
}

export type ProductResponse = IProduct[]

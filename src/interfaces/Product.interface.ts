import type { Category } from "./type"

export interface ProductInterface {
  id: number
  title: string
  image: string
  price: number
  quantity: number
  description: string
  category: Category
}

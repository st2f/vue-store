import type { Category } from "./Filters.interface"

export interface ProductInterface {
  id: number
  title: string
  image: string
  price: number
  quantity: number
  description: string
  category: Category
}

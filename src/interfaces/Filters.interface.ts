export type Category = 'all'| 'gamer' | 'desktop' | 'streaming'


export interface FilterInterface {
  search: string;
  priceRange: [number, number];
  category: Category
}

export interface FilterUpdate {
  search?: string;
  priceRange?: [number, number];
  category?: Category
}

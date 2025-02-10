import type { FilterInterface, ProductInterface } from "@/interfaces";

export async function fetchProduct(filter: FilterInterface, page: number): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();

  if (filter.category !== 'all'){
    query.append('category', filter.category);
  }

  if (page !== 1) {
    query.append('skip', ((page - 1) * 20) + '')
  }

  query.append('price', `$gte:${filter.priceRange[0]}`);
  query.append('price', `$lte:${filter.priceRange[1]}`);
  query.append('limit', 20 + '');

  const products = await (await fetch(`https://restapi.fr/api/projectproducts?${ query }`)).json();

  return products;
}

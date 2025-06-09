import type { ProductInput } from "../types/product.type"
import { getData } from "./apiClient"

export async function getAllProducts(params?: {
  page?: number
  size?: number
  sort?: string
  direction?: 'ASC' | 'DESC'
}): Promise<ProductInput[]> {
  const queryParams = new URLSearchParams()

  if (params) {
    if (params.page !== undefined) queryParams.append('page', params.page.toString())
    if (params.size !== undefined) queryParams.append('size', params.size.toString())
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.direction) queryParams.append('direction', params.direction)
  }

  const response = await getData<{ content: ProductInput[] }>(`api/produits?${queryParams.toString()}`)
  return response.content
}
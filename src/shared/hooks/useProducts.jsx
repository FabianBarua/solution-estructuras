import { useRef, useState } from 'react'
import { ALL_PARAMS, testProducts } from '../constants'

export function useProducts ({ params }) {
  const [responseProducts, setResponseProducts] = useState([])

  const products = responseProducts?.products || []
  const info = responseProducts?.info || {}
  const lastSearch = useRef('')

  async function getProducts () {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append(ALL_PARAMS.search, params?.search)
    urlSearchParams.append(ALL_PARAMS.categories, params?.categories)
    urlSearchParams.append(ALL_PARAMS.page, params?.page)
    urlSearchParams.append(ALL_PARAMS.sortID, params?.sortID)

    const res = await fetch(`/api/productos?${urlSearchParams.toString()}`)
    const products = await res.json()

    setResponseProducts(
      products
    )

    lastSearch.current = params?.search
  }

  return { products, info, getProducts }
}

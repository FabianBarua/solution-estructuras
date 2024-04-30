import { useRef, useState } from 'react'
import { testProducts } from '../constants'

export function useProducts ({ params }) {
  const [responseProducts, setResponseProducts] = useState([])

  const products = responseProducts?.results || []

  const lastSearch = useRef('')

  async function getProducts () {
    console.log(params?.search)

    setResponseProducts(
      testProducts
    )

    lastSearch.current = params?.search
  }

  return { products, getProducts }
}

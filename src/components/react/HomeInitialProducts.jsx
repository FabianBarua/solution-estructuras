import { useEffect, useState } from 'react'
import { Skeleton } from '@nextui-org/react'
import { ProductCard } from '@/components/react/HomeProductCard'

export const HomeInitialProducts = () => {
  const [initialProducts, setInitialProducts] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i
    }))
  )

  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    const fetchInitialProducts = async () => {
      const response = fetch('/api/productos/home')
      const data = await response
      const products = await data.json()
      setInitialProducts(products)
      setIsLoaded(true)
    }

    fetchInitialProducts()
  }, [])

  return (
    <>
      {
      initialProducts?.map(({ id, shortName, imageUrl }) => (
        <Skeleton key={id} isLoaded={isLoaded} className=' brand  size-[10.5rem] rounded-[34px] '>
          <li className=' size-[10.5rem] rounded-[34px]  '>
            <ProductCard id={id} shortName={shortName || ''} imageUrl={imageUrl} />
          </li>
        </Skeleton>
      ))
    }
    </>
  )
}

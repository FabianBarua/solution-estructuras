import { Pagination } from '@nextui-org/react'
import { MagicMotion } from 'react-magic-motion'
import { useDebouncedCallback } from 'use-debounce'
import { CategoryMoreSearched } from '@react/CategoryMoreSearched'
import { ProductsDisplay } from '@react/ProductsDisplay'
import { NotFound } from '@react/NotFound'
import { useProducts } from '@/shared/hooks/useProducts'
import { useParams } from '@/shared/hooks/useParams'
import { handleSearch } from '@/shared/stores/params'
import '@react/ProductsSection.css'

export const ProductsSection = () => {
  const searchDebounced = useDebouncedCallback(() => {
    getProducts({ params })
  }, 500)

  const { params, setSort, setCategories, setPage } = useParams({ searchDebounced })

  const { products, getProducts, info } = useProducts({
    params
  })

  return (
    <>
      <CategoryMoreSearched setCategoriesParams={setCategories} />
      <div className=' h-full  flex flex-col justify-center  items-center'>
        <ProductsDisplay products={products} />
        {
          info?.totalPages === 0 && (
            <NotFound
              search={params?.search}
            />
          )
        }
        <MagicMotion>
          <div className={` w-full ${info?.totalPages > 0 ? 'flex' : 'hidden'}   justify-center items-center py-6`}>

            <Pagination
              classNames={
                {
                  item: '  hover:bg-customOrange-500',
                  cursor: 'bg-customOrange-500   text-white'
                }
              }
              loop
              boundaries={3}
              showControls
              total={info.totalPages}
              onChange={setPage}
              initialPage={info.currentPage}
              page={info.currentPage}
            />

          </div>
        </MagicMotion>
      </div>
    </>
  )
}

import { Input, Select, SelectSection, SelectItem, Image } from '@nextui-org/react'

import '@react/ProductsSection.css'
import { SearchIcon } from '@icons/SearchIcon'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MagicMotion } from 'react-magic-motion'
import { GridResponsive } from '@react/GridResponsive'
import { Arrow } from '@react/Arrow'
import { useProducts } from '@/shared/hooks/useProducts'
import { ALL_PARAMS, ALL_SORTS } from '@/shared/constants'
import { useDebouncedCallback } from 'use-debounce'

const HeaderSearch = ({ setSort, handleSearch, inputValue, sortValue }) => {
  return (
    <div className=' flex flex-col sm:flex-row gap-4 mt-12'>
      <Input
        placeholder='Ingrese un texto...'
        radius='full'
        startContent={<SearchIcon />}
        onChange={handleSearch}
        defaultValue={inputValue || ''}
      />
      <Select
        placeholder='Relevancia'
        className=' brand sm:max-w-36  *:text-white  '
        color='primary'
        id='selectItems'
        style={{
          color: 'white'
        }}
        onChange={(e) => { setSort(ALL_SORTS[e.target.value] || ALL_SORTS[0]) }}
        defaultSelectedKeys={sortValue || 0}

      >
        <SelectSection className='brand  text-white' color='primary'>
          {ALL_SORTS.map((sort) => (
            <SelectItem key={sort.id}>
              {sort.name}
            </SelectItem>
          )
          )}
        </SelectSection>
      </Select>
    </div>
  )
}

const CategoryMoreSearched = ({ initialCategories, setCategoriesParams }) => {
  const [categories, setCategoriesState] = useState([...initialCategories])

  categories.sort((a, b) => {
    if (a.active && !b.active) {
      return -1
    } else if (!a.active && b.active) {
      return 1
    } else {
      return a.id - b.id
    }
  })

  useEffect(() => {
    setCategoriesParams(categories.filter(category => category.active).map(category => category.id).join('-') || '')
  }, [
    categories
  ])

  const toggleClick = ({ id }) => {
    const newCategories = categories.map(category => {
      if (category.id === id) {
        return {
          ...category,
          active: !category.active
        }
      } else {
        return category
      }
    }
    )

    setCategoriesState(newCategories)
  }

  const activeClass = 'bg-customOrange-500 hover:bg-customOrange-400 text-white  border-customBlue-600'
  const inactiveClass = 'bg-customBlue-600 hover:bg-[#2c1850] text-customOrange-500 border-customOrange-500 '
  return (
    <MagicMotion
      transition={{
        duration: 0.3
      }}
    >
      <ul className=' place-self-center place-items-center place-content-center placecenter  mt-4 gap-2 grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))]   '>

        {
                    categories.map((category) => (
                      <li key={category.id} className=' relative w-full'>
                        <button onClick={() => { toggleClick({ id: category?.id }) }} className={` ${category?.active ? activeClass : inactiveClass} border w-full px-4 py-1 rounded-xl  transition-all  `}>
                          {category.name}
                          {
                                    category?.active && (

                                      <div className=' -right-1  h-full  top-0 absolute flex justify-center items-center'>
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          key={category.id}
                                          className='  size-5 pb-[2px] bg-customBlue-600 flex justify-center  items-center leading-[1px] rounded-full border border-customOrange-500 text-customOrange-500'
                                        >
                                          ×
                                        </motion.div>
                                      </div>

                                    )
                                }
                        </button>
                      </li>
                    ))

                }

      </ul>
    </MagicMotion>

  )
}

const ProductCard = ({ id, shortName, imageUrl, price }) => {
  return (
    <article className='w-full hover:-translate-y-1 transition-all   border border-transparent hover:border-customOrange-500 relative  p-4 h-full max-w-44  overflow-hidden rounded-[20px] bg-white'>
      <a id='productImage' href={`/productos/${id}`}>
        <Image src={imageUrl} radius='' className='   white rounded-2xl  h-36  object-scale-down ' />
      </a>
      <p className=' leading-4'>{shortName}</p>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>Desde ${price}</p>
        <div />
      </div>
      <a
        id='linkToProduct'
        class='bg-customOrange-500  hover:bg-customOrange-300   absolute  z-30  -bottom-7 rotate-90 -right-[1.2rem] transition-all hover:scale-110 rounded-tl-[30px] rounded-bl-[35px] p-4 flex items-end rounded-br-[30px] size-[70px]'
        href={`/productos/${id}`}
      >
        <Arrow />
      </a>
    </article>
  )
}

const ProductsDisplay = ({ products }) => {
  return (
    <div className=' mt-4'>
      <GridResponsive>
        {products?.map((product, i) => (
          <li key={i} className='  w-full  flex justify-center items-center'>
            <ProductCard
              id={product.id}
              shortName={product.shortName}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          </li>
        ))}
      </GridResponsive>
    </div>

  )
}

export const ProductsSection = ({ initialCategories, initialParams }) => {
  const [params, setParams] = useState(initialParams || {})

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)

    if (params.search === '') {
      currentParams.delete(ALL_PARAMS.search)
    } else if (params.search) {
      currentParams.set(ALL_PARAMS.search, params.search)
    }

    if (params.sortID === 0) {
      currentParams.delete(ALL_PARAMS.sortID)
    } else if (params.sortID) {
      currentParams.set(ALL_PARAMS.sortID, params.sortID)
    }

    if (params.categories === '') {
      currentParams.delete(ALL_PARAMS.categories)
    } else if (params.categories) {
      currentParams.set(ALL_PARAMS.categories, params.categories)
    }

    if (params.page === 1) {
      currentParams.delete(ALL_PARAMS.page)
    } else if (params.page > 1) {
      currentParams.set(ALL_PARAMS.page, params.page)
    }
    window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`)
    searchDebounced()
  }, [params])

  // metodos para setear
  const setSort = (sort) => {
    console.log(sort)
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        sortID: sort.id
      }
      return newParams
    })
  }

  const setSearch = (value) => {
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        search: value
      }

      return newParams
    })
  }

  const setCategories = (categories) => {
    setParams((prevParams) => {
      const newParams = {
        ...prevParams,
        categories
      }
      return newParams
    })
  }

  const initialCategoriesActives = initialCategories.map(category => ({
    ...category,
    active: initialParams?.categories?.split('-').includes(category.id.toString())
  }))

  const { products, getProducts, info } = useProducts({
    params
  })

  const searchDebounced = useDebouncedCallback(() => {
    getProducts()
  }, 500)

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }
  const handleLoadMore = () => {
    console.log(info)
    if (info.nextUrl) {
      // cargar mas
    }
  }

  return (
    <>
      <HeaderSearch setSort={setSort} handleSearch={handleSearch} inputValue={initialParams?.search} sortValue={initialParams?.sortID} />
      <CategoryMoreSearched setCategoriesParams={setCategories} initialCategories={initialCategoriesActives} />
      <ProductsDisplay products={products} />
      <div className=' w-full flex'>
        <button onClick={handleLoadMore} className=' my-4 p-4 rounded-xl bg-white mx-auto'>Cargar mas</button>

      </div>
    </>
  )
}

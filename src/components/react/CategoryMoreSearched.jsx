import { useEffect, useRef, useState } from 'react'
import { motion, MagicMotion } from 'framer-motion'

export const CategoryMoreSearched = ({ setCategoriesParams }) => {
  const [categoriesState, setCategoriesState] = useState([])
  const firstRender = useRef(true)

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch('/api/categories')
      const categories = await response.json()
      setCategoriesState(categories)
    }

    getCategories()
  }, [])

  const sortedCategories =
    [...categoriesState].sort((a, b) => {
      if (a.active && !b.active) {
        return -1
      } else if (!a.active && b.active) {
        return 1
      } else {
        return a.id - b.id
      }
    })

  useEffect(() => {
    const activeCategories = sortedCategories.filter(category => category.active).map(category => category.id).join('-') || ''
    if (activeCategories !== '') {
      const newPage = firstRender.current ? null : 1
      setCategoriesParams({
        categories: activeCategories,
        newPage
      })
      firstRender.current = false
    } else {
      if (!firstRender.current) {
        setCategoriesParams({
          categories: activeCategories,
          page: 1
        })
      }
    }
  }, [categoriesState])

  const toggleClick = ({ id }) => {
    const newCategories = sortedCategories.map(category => {
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
                      sortedCategories.map((category) => (
                        <li key={category.id} className=' relative w-full'>
                          <button onClick={() => { toggleClick({ id: category?.id }) }} className={` ${category?.active ? activeClass : inactiveClass} border truncate w-full px-4 py-1 rounded-xl  transition-all  `}>
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

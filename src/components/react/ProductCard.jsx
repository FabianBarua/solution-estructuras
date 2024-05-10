import { Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Arrow } from '@react/Arrow'
export const ProductCard = ({ id, shortName, imageUrl, price, index }) => {
  const errorImage = '/images/errorImage.png'

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      key={id}
      className='w-full flex flex-col pb-4 pt-3  hover:-translate-y-1 transition-all   border  border-transparent hover:border-customOrange-500 relative   h-full max-w-44  overflow-hidden rounded-[20px] bg-white'
    >
      <a id='productImage' className=' mx-auto size-[150px]' href={`/productos/${id}`}>
        <Image width={150} height={150} src={imageUrl || errorImage} className=' rounded-3xl size-[150px] object-cover  ' />
      </a>
      <p className=' ml-3 leading-4 mt-1'>{shortName}</p>
      <p className='text-sm ml-3 mt-1 text-gray-500  leading-4 '>Desde {price}₲ </p>
      <a
        id='linkToProduct'
        className='bg-customOrange-500  hover:bg-customOrange-300   absolute  z-30  -bottom-7 rotate-90 -right-[1.2rem] transition-all hover:scale-110 rounded-tl-[30px] rounded-bl-[35px] p-4 flex items-end rounded-br-[30px] size-[70px]'
        href={`/productos/${id}`}
      >
        <Arrow />
      </a>
    </motion.article>
  )
}

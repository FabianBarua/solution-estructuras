import { motion } from 'framer-motion'

export const NotFound = ({ search }) => {
  return (
    <div className=' mt-8 relative overflow-hidden flex  justify-center items-center text-white  p-12 bg-customBlue-600 rounded-xl border border-customBlue-500'>
      <div className=' w-full flex justify-center flex-col max-w-72 text-2xl'>
        <h1 className=' font-light '>Ningún resultado para </h1>
        <span className=' font-medium text-customOrange-400 truncate'>"{search}"</span>
        <p className=' font-medium leading-6 mt-2 text-3xl'>Intenta de nuevo con otro término.</p>
      </div>
      <motion.img
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src='/images/arrow404.png' className=' w-32 h-auto ' alt=''
      />
    </div>
  )
}

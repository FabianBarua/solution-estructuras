import { GridResponsive } from '@react/GridResponsive'
import { ProductCard } from '@react/ProductCard'

export const ProductsDisplay = ({ products }) => {
  return (
    <div className=' mt-4 w-full '>
      <GridResponsive size='large'>
        {products?.map((product, i) => (
          <li key={i} className=' w-full  transition-all h-full flex justify-center items-center'>
            <ProductCard
              index={i + 1}
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

import React from 'react'
import { useContext } from 'react' 
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

function ProductDetail() {
  const context = useContext(ShoppingCartContext)

  return (
    <aside className={ `${context.isProductDetailOpen ? 'flex' : 'hidden' } flex-col fixed right-0 top-0 z-20 border bg-white shadow-2xl w-[380px] h-[100vh]`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <XMarkIcon onClick={() => context.closeProductDetail()} className='w-6 h-6 cursor-pointer' />
        </div>
        <figure className='px-6'>
          <img 
            className='w-full h-full rounded-lg' 
            src={context.productToShow.images} 
            alt={context.productToShow.title} />
        </figure>
        <p className='flex flex-col p-6'>
          <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
          <span className='font-medium text-md'>{context.productToShow.title}</span>
          <span className='font-light text-sm'>{context.productToShow.description}</span>
        </p>
    </aside>
  )
}

export default ProductDetail
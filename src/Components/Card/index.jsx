import React from 'react';
import { useContext } from 'react'; 
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context'; 

function Card(data) {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }

  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div className='absolute transition ease-in-out hover:scale-110 top-0 right-0 flex items-center justify-center bg-white w-6 h-6 rounded-full m-2'><CheckIcon className='w-3 h-3' /></div>
      )
    } else {
      return (
        <div className='absolute transition ease-in-out hover:scale-110 top-0 right-0 flex items-center justify-center bg-white w-6 h-6 rounded-full m-2' onClick={(event) => addProductsToCart(event, data.data)}><PlusIcon className='w-3 h-3' /></div>
      )
    }
  }

  return (
    <div onClick={() => showProduct(data.data)} className='bg-white cursor-pointer w-56 h-60 rounded-2xl'>
        <figure className='relative mb-4 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
            <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt="product-image" />
            {renderIcon(data.data.id)}
        </figure>
        <p className='flex justify-between'>
            <span className='text-sm font-light'>{data.data.title}</span>
            <span className='text-lg font-medium'>${data.data.price}</span>
        </p>
    </div>
  )
}

export default Card;
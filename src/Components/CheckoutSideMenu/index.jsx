import React from 'react'
import { useContext } from 'react' 
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../Utils'

function CheckoutSideMenu() {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.closeCheckoutSideMenu()
    context.setSearchByTitle(null)
  }

  return (
    <aside className={ `${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden' } flex-col fixed right-0 top-20 z-20 border bg-white shadow-2xl w-[380px] h-[550px]`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>My Order</h2>
            <XMarkIcon onClick={() => context.closeCheckoutSideMenu()} className='w-6 h-6 cursor-pointer' />
        </div>
        <div className='px-6 overflow-y-scroll'>
          {
            context.cartProducts.map(product => (
              <OrderCard 
                key={product.id}
                id={product.id}
                title={product.title} 
                imageUrl={product.images} 
                price={product.price} 
                handleDelete={handleDelete}
              />
            ))
          }
        </div>
        <div className='px-8 py-6'>
          <p className='flex justify-between'>
            <span className='text-lg font-bold'>Total:</span>
            <span>${totalPrice(context.cartProducts)}</span>
          </p>
          <Link to='/my-orders/last'>
            <button className='w-full bg-black py-4 mt-6 rounded-lg text-white' onClick={() => handleCheckout()}>Checkout</button>
          </Link>
        </div>
    </aside>
  )
}

export default CheckoutSideMenu
import React, { useContext } from 'react';
import Layout from '../../Components/Layout';
import { Link } from 'react-router-dom';
import OrdersCard from '../../Components/OrdersCard';
import { ShoppingCartContext } from '../../Context'

function MyOrders() {
  const context = useContext(ShoppingCartContext)

  return (
    <Layout>

      <div className='flex justify-center items-center w-80 relative mb-8'>
        <h2 className='m-10 font-semibold text-xl'>My Orders</h2>
      </div>

      {
        context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard 
              totalPrice={order.totalPrice} 
              totalProducts={order.totalProducts} 
            />
          </Link>
        ))
      }
    </Layout>
  )
}

export default MyOrders
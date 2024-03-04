import { useContext } from 'react'; 
import React from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

function Home() {

  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center'>
          <FaceFrownIcon className='w-25 h-25 text-gray-400' />
          <h1 className='text-2xl font-bold text-gray-500 mt-2'>We don't have anything</h1>
        </div>
      )
    }
  } 

  return (
    <Layout>
      <div className='flex justify-between gap-96 items-center m-10'>
        <h2 className='m-10 font-semibold text-xl'>Our Products</h2>
        <input 
          className='rounded-lg focus:outline-none focus:border-black border-b-2 border-gray-400 w-80 p-4 mb-4' 
          type="text" 
          placeholder='Search a product...'
          onChange={(event) => context.setSearchByTitle(event.target.value)} />
      </div>
      <div className={`${context.filteredItems?.length === 0 ? '' : 'grid gap-10 grid-cols-4 w-full max-w-screen-lg'}`}>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home
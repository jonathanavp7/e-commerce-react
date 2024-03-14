import { useContext } from 'react'; 
import React from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import Loading from '../../Components/Loading'
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

function Home() {

  const context = useContext(ShoppingCartContext)

  const renderView = () => {

    if (context.filteredItems?.length > 0) {
      context.setLoading(false)
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else if (context.filteredItems?.length === 0) {
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
      <div className='flex justify-between gap-96 items-center m-10 max-sm:flex-col max-sm:gap-0'>
        <h2 className='m-10 font-semibold text-xl max-sm:hidden'>Our Products</h2>
        <div className="flex items-center justify-center p-5">
          <div className="rounded-lg bg-white p-5">
            <div className="flex shadow-lg">
              <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
              </div>
              <input onChange={(event) => context.setSearchByTitle(event.target.value)} type="text" className="w-full max-w-[180px] bg-white pl-2 text-sm font-light outline-0" placeholder="Search a product..." id="" />
              <input type="button" value="Search" className="bg-black p-2 px-3 rounded-tr-lg cursor-pointer rounded-br-lg text-white font-semibold hover:bg-gray-700 transition-colors" />
            </div>
          </div>
        </div>
        <h2 className='m-10 font-semibold text-xl sm:hidden'>Our Products</h2>
      </div>
      <div className='flex justify-center items-center'>
        <div className={`${context.filteredItems?.length === 0 ? '' : 'grid gap-10 grid-cols-4 w-full max-w-screen-lg max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'}`}>
          {renderView()}
        </div>
      </div>
      {context.loading && <Loading />}
      <ProductDetail />
    </Layout>
  )
}

export default Home